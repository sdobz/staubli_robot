{ pkgs, config, lib, ... }:
let
  secrets = pkgs.callPackage ./secrets.nix {};
in {
  environment.systemPackages = with pkgs; [
    vim
    rsync
    screen
    (import ./staubli.nix { inherit pkgs; }).env
  ];

  services.openssh = {
    enable = true;
    settings.PasswordAuthentication = false;
    settings.PermitRootLogin = "yes";
  };

  networking.hostName = "staubli";
  networking.firewall.allowedTCPPorts = [ 22 80 8000 8765 ];
  users = rec {
    users.staubli = {
      openssh.authorizedKeys.keys = secrets.authorizedKeys;
      hashedPassword = secrets.hashedPassword;
      # isNormalUser = true;
      extraGroups = [ "wheel" "dialout" ];
    };

    users.root.openssh.authorizedKeys.keys = users.staubli.openssh.authorizedKeys.keys;
  };
  nix.settings.require-sigs = false;
  networking = {
    interfaces."wlan0".useDHCP = true;
    wireless = {
      interfaces = [ "wlan0" ];
      enable = true;
      networks = secrets.networks;
    };
  };
  system.stateVersion = "24.05";
}
