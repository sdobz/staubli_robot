# This shit is busted because parcel fails to build and I can't be arsed to figure out how to exclude it
{ pkgs }: pkgs.buildNpmPackage  {
  pname = "closed-chain-ik";
  version = "0.0.3-dev";
  src = pkgs.fetchFromGitHub {
    owner = "sdobz";
    repo = "closed-chain-ik-js";
    rev = "eedbef7b6cfefb0bae7d051d1ba56671d7295968";
    hash = "sha256-lk3Vt3qy6ogQhj6i3rhZ8fW4ue2lDzbWdIFCy1o51tQ=";
  };
  npmDepsHash = "sha256-EqiYMJ86KlM3cjROaxzCnc1Ly0aPKWPCWoAg5c8HTxE=";

  buildPhase = ''
    npm run bundle
  '';

  installPhase = ''
    runHook preInstall

    mkdir -p $out
    cp -r dist/closed-chain-ik-js.js $out

    runHook postInstall
  '';
}