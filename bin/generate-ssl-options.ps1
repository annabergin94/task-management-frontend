$localhost_ssl_folder = "src/main/resources/localhost-ssl"

if (!(Test-Path "$localhost_ssl_folder/localhost.key") -or !(Test-Path "$localhost_ssl_folder/localhost.crt")) {
    New-Item -ItemType Directory -Force -Path $localhost_ssl_folder

    openssl req `
        -nodes `
        -x509 `
        -newkey rsa:4096 `
        -keyout "$localhost_ssl_folder/localhost.key" `
        -out "$localhost_ssl_folder/localhost.crt" `
        -sha256 `
        -days 3650 `
        -subj "/C=GB/ST=A/L=B/O=C/OU=D/CN=E" `
        -addext "subjectAltName = DNS:host.docker.internal,DNS:localhost,IP:127.0.0.1" `
        -addext "extendedKeyUsage = serverAuth"
}