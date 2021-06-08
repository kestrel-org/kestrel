clear
ENV="DEV"
if [ -n "$1" ]
  then
    ENV="${1^^}"
fi
me=`basename "$0"`
msg="\e[1;32m"
error="\e[31m"
neutre="\e[0;m"
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
envVARS=("DB_SCHEMA_$ENV" "DB_USERNAME_$ENV" "DB_PASSWORD_$ENV")

echo -e "\n${msg}[${me^^}]${neutre}"

for i in "${envVARS[@]}"
do
    tmp=$(grep $i= $SCRIPT_DIR/../backend/.env | cut -f2- -d=)
    if [ ${#tmp} -lt 1 ] ; then
        echo -e "${error}La variable d'environnement '$i' n'a pas été spécifié correctement.${neutre}"
        read -p "Appuyer sur n'importe quelle touche pour continuer ..."
        exit 1
    fi
    declare $i=$tmp
done

echo -e "\n${msg}----- Initialisation de la base de données -----${neutre}"
cd "${SCRIPT_DIR}/../backend"

echo -e "${msg}\nsuppression de la base de données ...${neutre}"
npx sequelize-cli db:drop --env ${ENV,,}

echo -e "${msg}\ncréation de la base de données ...${neutre}"
npx sequelize-cli db:create --env ${ENV,,}

echo -e "${msg}\ncréation des tables ...${neutre}"
npx sequelize-cli db:migrate --env ${ENV,,}

echo -e "${msg}\ncréation des modèles ...${neutre}"
npm run generate-models -- "${!envVARS[0]}" "${!envVARS[1]}" "${!envVARS[2]}"

echo -e "${msg}\ninsertion des données ...${neutre}"
npx sequelize-cli db:seed:all --env ${ENV,,}

read -p "Appuyer sur n'importe quelle touche pour continuer ..."