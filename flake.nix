{
  description = "Staubli Robot Control";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-23.11";
    utils.url = "github:numtide/flake-utils";
    nixos-hardware.url = "github:nixos/nixos-hardware";
  };

  outputs = { self, nixpkgs, nixos-hardware, utils }: {
    images = {
      pi = (self.nixosConfigurations.pi.extendModules {
        modules = [
          "${nixpkgs}/nixos/modules/installer/sd-card/sd-image-aarch64.nix"
          {
            disabledModules = [ "profiles/base.nix" ];
            sdImage.compressImage = false;
          }
        ];
      }).config.system.build.sdImage;
    };
    nixosConfigurations = {
      pi = nixpkgs.lib.nixosSystem {
        system = "aarch64-linux";
        modules = [
          nixos-hardware.nixosModules.raspberry-pi-4
          "${nixpkgs}/nixos/modules/profiles/minimal.nix"
          ./pi/configuration.nix
          ./pi/base.nix
        ];
      };
    };
  } // (utils.lib.eachSystem [ "x86_64-linux" ] (system: let
    pkgs = nixpkgs.legacyPackages.${system};
  in rec {
    packages = {
      pi-image = self.images.pi;
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
