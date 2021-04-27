clear
msg="\e[1;32m"
neutre="\e[0;m"
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

echo -e "${msg}----- Initialisation de la base de données -----${neutre}"
cd "${SCRIPT_DIR}/../backend"

echo -e "${msg}\nsuppression de la base de données ...${neutre}"
npx sequelize-cli db:drop

echo -e "${msg}\ncréation de la base de données ...${neutre}"
npx sequelize-cli db:create

echo -e "${msg}\ncréation des tables ...${neutre}"
npx sequelize-cli db:migrate

echo -e "${msg}\ncréation des modèles ...${neutre}"
npm run generate-models

echo -e "${msg}\ninsertion des données ...${neutre}"
npx sequelize-cli db:seed:all

read -p "Appuyer sur n'importe quelle touche pour continuer ..."