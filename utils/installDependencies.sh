clear
me=`basename "$0"`
msg="\e[1;32m"
neutre="\e[0;m"
DIR="./node_modules"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

# Loader
startLoader() {
    i=1
    sp="/-\|"
    echo -n '  '
    while true; do
        printf "\b${sp:i++%${#sp}:1}"
    done &
    loader_id=$!
}
endLoader() {
    kill $loader_id
    printf '\r'
}

echo -e "\n${msg}[${me^^}]${neutre}"

# Installation des dépendances du Backend
echo -e "\n${msg}----- Backend -----${neutre}"
cd "${SCRIPT_DIR}/../backend"
if [ ! -d "$DIR" ]; then
    echo -e "\n ${msg}installation des dépendances du backend ...${neutre} \n"
    startLoader
    npm install
    endLoader
    echo -e "\n ${msg}fin de l'installation des dépendances du backend ${neutre} \n"
else
    echo -e "\n ${msg}dépendances du backend déjà installées${neutre} \n"
fi

# Installation des dépendances du Frontend
echo -e "\n${msg}----- Frontend -----${neutre}"
cd ../frontend
if [ ! -d "$DIR" ]; then
    echo -e "\n ${msg}installation des dépendances du frontend ...${neutre}\n"
    startLoader
    npm install
    endLoader
    echo -e "\n ${msg}fin de l'installation des dépendances du frontend${neutre} \n"
else
    echo -e "\n ${msg}dépendances du frontend déjà installées${neutre} \n"
fi

read -p "Appuyer sur n'importe quelle touche pour continuer ..."
