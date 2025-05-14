{
  description = "Staubli Robot Control";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    utils.url = "github:numtide/flake-utils";
    nixos-hardware.url = "github:nixos/nixos-hardware";
  };

  outputs = { self, nixpkgs, nixos-hardware, utils }: {
    images = {
      staubli = (self.nixosConfigurations.staubli.extendModules {
        modules = [
          "${nixpkgs}/nixos/modules/installer/sd-card/sd-image-aarch64.nix"
          {
            disabledModules = [
              "profiles/base.nix"
              "profiles/all-hardware.nix"
            ];
            sdImage.compressImage = false;
          }
        ];
      }).config.system.build.sdImage;
    };
    nixosConfigurations = {
      staubli = nixpkgs.lib.nixosSystem {
        system = "aarch64-linux";
        modules = [
          nixos-hardware.nixosModules.raspberry-pi-4
          "${nixpkgs}/nixos/modules/profiles/minimal.nix"
          ./pi/configuration.nix
          ./pi/base.nix
          ./pi/service.nix
        ];
      };
    };
  } // (utils.lib.eachSystem [ "x86_64-linux" "aarch64-darwin" ] (system: let
    pkgs = nixpkgs.legacyPackages.${system};
    staubli = import ./pi/staubli.nix { inherit pkgs; };
  in rec {
    packages = {
      closed-chain-ik-js = import ./closed-chain-ik-js.nix { inherit pkgs; };
      pi-image = self.images.staubli;
      staubli = staubli.package;
      pythonEnv = staubli.env;
      devPythonEnv = pkgs.python3.withPackages(ps: with ps; [
        black
      ]);
      simplify = pkgs.buildGoPackage {
        pname = "simplify";
        version = "dev";

        src = pkgs.fetchFromGitHub {
          owner = "fogleman";
          repo = "simplify";
          rev = "d32f302d50469376eae60b2cd5a328c26888fade";
          sha256 = "sha256-dVs8i3Qa3CKZ+xBjoLEYASItF9rHHcln7K9z2WI+hXg=";
        };

        goPackagePath = "github.com/fogleman/simplify";

        subPackages = [ "cmd/simplify" ];
      };
    };

    defaultPackage = packages.pythonEnv; # If you want to juist build the environment
    #devShell = packages.pythonEnv.env; # We need .env in order to use `nix develop`
    devShell = pkgs.mkShell {
      buildInputs = [
        packages.pythonEnv
        packages.devPythonEnv
        # packages.simplify
        pkgs.rsync
        pkgs.curl
        pkgs.typescript
        pkgs.git-crypt
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
