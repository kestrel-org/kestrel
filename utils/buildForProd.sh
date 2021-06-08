clear
me=`basename "$0"`
msg="\e[1;32m"
neutre="\e[0;m"
DIR="./node_modules"
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

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

# Suppression du précédent dossier
echo -e "\n ${msg}suppression du précédent dossier ...${neutre} \n"
startLoader
rm -rf "${SCRIPT_DIR}/../dist/"
endLoader

# Build du backend
echo -e "\n${msg}----- Backend -----${neutre}"
cd "${SCRIPT_DIR}/../backend"
echo -e "\n ${msg}copie des fichiers ...${neutre}"
shopt -s extglob dotglob
echo -e "\n ${msg}création du dossier dist ...${neutre}"
if [ ! -d "../dist" ]; then
    mkdir ../dist
fi
cp -r ./!(node_modules) ../dist
cd ../dist
echo -e "\n ${msg}installation des dépendances du backend ...${neutre}\n"
startLoader
npm install
endLoader
echo -e "\n ${msg}modification de app.js pour la prise en compte du frontend ...${neutre}"
sed -i "/catch 404/i\// Angular\napp.use(express.static(path.join(__dirname, \"public\")));\napp.get('**', function (req, res) {\n  res.sendFile(__dirname + '/public/index.html');\n});\n" ../dist/src/app.js
echo -e "\n ${msg}Fin du build du backend${neutre} \n"

# Build du frontend
echo -e "${msg}\n----- Frontend -----${neutre}"
cd "../frontend"
if [ ! -d "$DIR" ]; then
    echo -e "\n ${msg}installation des dépendances du frontend ...${neutre}\n"
    startLoader
    npm install
    endLoader
else
    echo -e "\n ${msg}dépendances du frontend déjà installées${neutre}"
fi
echo -e "\n ${msg}build du frontend ...${neutre}"
startLoader
npm run build
endLoader
echo -e "\n ${msg}copie des fichiers ...${neutre}"
mv dist/frontend ../dist/src/public
echo -e "\n ${msg}Fin du build du frontend${neutre} \n"

echo -e "${msg}\nBuild terminé, l'ouput se situe dans le dossier dist.\nN'oubliez pas d'initialiser votre base de données avec Sequelize.\nVous pouvez utilisez le script initDB.sh${neutre}\n\n"

read -p "Appuyer sur n'importe quelle touche pour continuer ..."