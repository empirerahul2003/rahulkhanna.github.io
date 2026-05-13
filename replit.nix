{pkgs}: {
  deps = [
    pkgs.zlib
    pkgs.pkg-config
    pkgs.libxslt
    pkgs.libxml2
    pkgs.inotify-tools
    pkgs.imagemagick
  ];
}
