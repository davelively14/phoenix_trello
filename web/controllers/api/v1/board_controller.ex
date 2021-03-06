defmodule PhoenixTrello.BoardController do
  use PhoenixTrello.Web, :controller

  plug Guardian.Plug.EnsureAuthenticated, handler: PhoenixTrello.SessionController

  alias PhoenixTrello.{Repo, Board, UserBoard}

  def index(conn, _params) do
    current_user = Guardian.Plug.current_resource(conn)

    # TODO I like this way of getting associations
    owned_boards =
      current_user
      |> assoc(:owned_boards)
      |> Board.preload_all
      |> Repo.all

    render(conn, "index.json", owned_boards: owned_boards)
  end

  def create(conn, %{"board" => board_params}) do
    current_user = Guardian.Plug.current_resource(conn)

    # TODO I like this way, too
    changeset =
      current_user
      |> build_assoc(:owned_boards)
      |> Board.changeset(board_params)

    case Repo.insert(changeset) do
      {:ok, board} ->

        # Create the UserBoard immediately and build association to the board
        # and creator, the current_user.
        board
        |> build_assoc(:user_boards)
        |> UserBoard.changeset(%{user_id: current_user.id})
        |> Repo.insert!

        conn
        |> put_status(:created)
        |> render("show.json", board: board)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", changeset: changeset)
    end
  end
end
