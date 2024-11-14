import { AppstoreAddOutlined } from '@ant-design/icons';

function Default() {
    return (
      <div className="size-full mx-3 my-3">
        <div className="flex h-screen justify-center items-center flex-col">
        <p className="text-lg text-gray-500 mb-4">Выбери действие</p>
        <AppstoreAddOutlined style={{ fontSize: 64, color: '#a8a8a8'}} />
      </div>
      </div>
    );
  }
  
  export default Default;