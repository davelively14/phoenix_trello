defmodule PhoenixTrello.Card do
  use PhoenixTrello.Web, :model

  alias PhoenixTrello.{Repo, List}

  @derive {Poison.Encoder, only: [:id, :name, :list_id]}

  schema "cards" do
    field :name, :string
    belongs_to :list, PhoenixTrello.List

    timestamps()
  end

  @required_fields ~w(name)
  @optional_fields ~w()

  def changeset(model, params \\ %{}) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
