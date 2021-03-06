defmodule PhoenixTrello do
  use Application

  # See http://elixir-lang.org/docs/stable/elixir/Application.html
  # for more information on OTP Applications
  def start(_type, _args) do
    import Supervisor.Spec

    # Define workers and child supervisors to be supervised
    children = [
      # Start the Ecto repository
      supervisor(PhoenixTrello.Repo, []),
      # Start the endpoint when the application starts
      supervisor(PhoenixTrello.Endpoint, []),
      # Every time the app starts, this worker will start. An empty map will be
      # passed as the initial state.
      worker(PhoenixTrello.BoardChannel.Monitor, [%{}])
    ]

    # See http://elixir-lang.org/docs/stable/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: PhoenixTrello.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    PhoenixTrello.Endpoint.config_change(changed, removed)
    :ok
  end
end
