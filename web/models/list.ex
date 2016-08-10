defmodule PhoenixTrello.List do
  use PhoenixTrello.Web, :model

  alias PhoenixTrello.{Board, List, Card}

  @derive {Poison.Encoder, only: [:id, :board_id, :name, :cards]}

  schema "lists" do
    field :name, :string
    belongs_to :board, Board
    has_many :cards, Card

    timestamps()
  end

  @required_fields ~w(name)
  @optional_fields ~w()

  def changeset(model, params \\ %{}) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
