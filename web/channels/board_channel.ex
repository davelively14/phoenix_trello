defmodule PhoenixTrello.BoardChannel do
  use PhoenixTrello.Web, :channel
  alias PhoenixTrello.{UserBoard, User, Board, List, Card, Comment, CardMember}
  alias PhoenixTrello.BoardChannel.Monitor

  def join("boards:" <> board_id, _params, socket) do
    current_user = socket.assigns.current_user
    board = get_current_board(socket, board_id)
    connected_users = Monitor.user_joined(board_id, current_user.id)

    send(self, {:after_join, connected_users})

    {:ok, %{board: board}, assign(socket, :board, board)}
  end

  def terminate(_reason, socket) do
    board_id = Board.slug_id(socket.assigns.board)
    user_id = socket.assigns.current_user.id

    # NOTE: we haven't implemented the user_left function yet.
    broadcast! socket, "user:left", %{users: Monitor.user_left(board_id, user_id)}
  end

  def handle_in("members:add", %{"email" => email}, socket) do
    try do
      board = socket.assigns.board
      user =
        User
        |> Repo.get_by(email)

      changeset =
        user
        |> build_assoc(:user_boards)
        |> UserBoard.changeset(%{board_id: board.id})

      case Repo.insert(changeset) do
        {:ok, _board_user} ->
          broadcast! socket, "member:added", %{user: user}

          # TODO you can broadcast to any channel from any other channel
          # Broadcasts the message "boards:add" to the channel of the user
          # who was just given access to the board so that he can begin using it
          # right away.
          PhoenixTrello.Endpoint.broadcast_from! self(), "users:#{user.id}", "boards:add", %{board: board}

          {:noreply, socket}
        {:error, _changeset} ->
          {:reply, {:error, %{error: "Error adding new member"}}, socket}
      end
    catch
      _, _ ->
        {:reply, {:error, %{error: "User does not exist"}}, socket}
    end
  end

  def handle_in("lists:create", %{"lists" => list_params}, socket) do
    board = socket.assigns.board

    changeset =
      board
      |> build_assoc(:lists)
      |> List.changeset(list_params)

    case Repo.insert(changeset) do
      {:ok, list} ->
        list = Repo.preload(list, [:cards])

        broadcast! socket, "list:created", %{list: list}
      {:error, _changeset} ->
        {:reply, {:error, %{error: "Error creating list"}}, socket}
    end
  end

  def handle_in("cards:create", %{"card" => card_params}, socket) do
    board = socket.assigns.board
    changeset =
      board
      |> assoc(:lists)
      |> Repo.get!(card_params["list_id"])
      |> build_assoc(:cards)
      |> Card.changeset(card_params)

    case Repo.insert(changeset) do
      {:ok, card} ->
        broadcast! socket, "card:created", %{card: card}
        {:noreply, socket}
      {:error, _changeset} ->
        {:reply, {:error, %{error: "Error creating card"}}, socket}
    end
  end

  def handle_info({:after_join, connected_users}, socket) do
    broadcast! socket, "user:joined", %{users: connected_users}

    {:noreply, socket}
  end

  # I don't understand why we're doing an association on a Repo.get? Should just
  # be: Repo.get(Board, board_id).
  defp get_current_board(socket, board_id) do
    socket.assigns.current_user
    |> assoc(:boards)
    |> Repo.get(board_id)
  end
end
