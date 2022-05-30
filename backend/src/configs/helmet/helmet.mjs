import helmet from 'helmet';
import config from './config'
export default (app) => {

    app.use(helmet(config.HELMET_OPTIONS));
}
