clear
msg="\e[1;32m"
neutre="\e[0;m"
DIR="./node_modules"
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Suppression du précédent dossier
rm -rf "${SCRIPT_DIR}/../dist/"

# Build du backend
echo -e "${msg}----- Backend -----${neutre}"
cd "${SCRIPT_DIR}/../backend"
if [ ! -d "$DIR" ]; then
    echo -e "\n ${msg}installation des dépendances du backend ...${neutre} \n"
    npm install
    echo -e "\n ${msg}fin de l'installation des dépendances du backend${neutre} \n"
else
    echo -e "\n ${msg}dépendances du backend déjà installées${neutre} \n"
fi
echo -e "\n${msg}build du backend ...${neutre}"
cp -r . ../dist
sed -i "/catch 404/i\// Angular\napp.use(express.static(path.join(__dirname, \"public\")));\napp.get('**', function (req, res) {\n  res.sendFile(__dirname + '/public/index.html');\n});\n" ../dist/src/app.js

# Build du frontend
echo -e "${msg}\n----- Frontend -----${neutre}"
cd "../frontend"
if [ ! -d "$DIR" ]; then
    echo -e "\n ${msg}installation des dépendances du frontend ...${neutre}\n"
    npm install
    echo -e "\n ${msg}fin de l'installation des dépendances du frontend${neutre} \n"
else
    echo -e "\n ${msg}dépendances du frontend déjà installées${neutre} \n"
fi
echo -e "${msg}\nbuild du frontend ...${neutre}"
npm run build
mv dist/frontend ../dist/src/public
sleep 5

echo -e "${msg}\nBuild terminé, l'ouput se situe dans le dossier dist.\nN'oubliez pas d'initialiser votre base de données avec Sequelize.\nVous pouvez utilisez le script initDB.sh${neutre}\n\n"

read -p "Appuyer sur n'importe quelle touche pour continuer ..."