#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

VENDOR_DIR="$SCRIPT_DIR/staubli/html/vendor"

# Call with a url to vendor the file
v() {
  local url="$1"
  local package_path="$VENDOR_DIR/$2"

  mkdir -p $package_path

  echo "Vendoring '$url' to '$package_path'"

  curl -OL --output-dir "$package_path" "$url"
}

echo "Clearing vendor dir"
rm -r $VENDOR_DIR

v "https://unpkg.com/normalize.css@8.0.1/normalize.css"      "css"
# v "https://unpkg.com/@picocss/pico@2.0.6/css/pico.amber.css" "css"

URDF_LOADER_VERSION=c47037d231f14a19c591ce9564381ae623410619
v "https://raw.githubusercontent.com/gkjohnson/urdf-loaders/$URDF_LOADER_VERSION/javascript/src/URDFClasses.js"       "js/urdf-loader"
v "https://raw.githubusercontent.com/gkjohnson/urdf-loaders/$URDF_LOADER_VERSION/javascript/src/URDFClasses.d.ts"     "js/urdf-loader"
v "https://raw.githubusercontent.com/gkjohnson/urdf-loaders/$URDF_LOADER_VERSION/javascript/src/URDFDragControls.js"  "js/urdf-loader"
v "https://raw.githubusercontent.com/gkjohnson/urdf-loaders/$URDF_LOADER_VERSION/javascript/src/URDFLoader.js"        "js/urdf-loader"
v "https://raw.githubusercontent.com/gkjohnson/urdf-loaders/$URDF_LOADER_VERSION/javascript/src/URDFLoader.d.ts"      "js/urdf-loader"


v "https://raw.githubusercontent.com/sdobz/closed-chain-ik-js/cc5b394d212d8d4a050da3c22667cc907835364c/dist/closed-chain-ik-js.js" "js"
curl "https://cdn.jsdelivr.net/npm/linear-solve@1.2.1/+esm"  --output "$VENDOR_DIR/js/linear-solve.esm.js"
curl "https://cdn.jsdelivr.net/npm/gl-matrix@3.4.3/+esm" --output "$VENDOR_DIR/js/gl-matrix.esm.js"
curl "https://cdn.jsdelivr.net/npm/svd-js@1.1.1/+esm" --output "$VENDOR_DIR/js/svd-js.esm.js"
