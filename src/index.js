import './index.html';
import 'antd/dist/antd.css';
import './index.css';
import dva from 'dva';

// 1. Initialize
const app = dva();

// 3. Model
app.model(require('./models/ui'));
app.model(require('./models/auth'));
app.model(require('./models/conversations'));
app.model(require('./models/customService'));
app.model(require('./models/robot'));
app.model(require('./models/chat'));
app.model(require('./models/users'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
