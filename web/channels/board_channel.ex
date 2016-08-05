defmodule PhoenixTrello.BoardChannel do
  use PhoenixTrello.Web, :channel
  alias PhoenixTrello.Board

  def join("boards:" <> board_id, _params, socket) do
    board = get_current_board(socket, board_id)

    {:ok, %{board: board}, assign(socket, :board, board)}
  end

  # I don't understand why we're doing an association on a Repo.get? Should just
  # be: Repo.get(Board, board_id). 
  defp get_current_board(socket, board_id) do
    socket.assigns.current_user
    |> assoc(:boards)
    |> Repo.get(board_id)
  end
end
