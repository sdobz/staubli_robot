{
  description = "Volcandle dev env";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-23.11";
    utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, utils }: (utils.lib.eachSystem ["x86_64-linux" ] (system: let
    pkgs = nixpkgs.legacyPackages.${system};
  in rec {
    packages = {
      pythonEnv = pkgs.python3.withPackages(ps: with ps; [
        pyserial
      ]);
      devPythonEnv = pkgs.python3.withPackages(ps: with ps; [
        black
      ]);
    };

    defaultPackage = packages.pythonEnv; # If you want to juist build the environment
    #devShell = packages.pythonEnv.env; # We need .env in order to use `nix develop`
    devShell = pkgs.mkShell {
      buildInputs = [
        packages.pythonEnv
        packages.devPythonEnv
      ];
      shellHook = ''
        if [ -e .venv ] && [ ! -L .venv ]; then
          echo ".venv exists and is not a symlink. Exiting."
          exit 1
        fi
        if [ -e .venv-dev ] && [ ! -L .venv-dev ]; then
          echo ".venv-dev exists and is not a symlink. Exiting."
          exit 1
        fi

        rm -rf .venv \
          && ln -s ${packages.pythonEnv} .venv

        rm -rf .venv-dev \
          && ln -s ${packages.devPythonEnv} .venv-dev

        echo "Linked nix python env to .venv and .venv-dev"
      '';
    };
  }));
}
