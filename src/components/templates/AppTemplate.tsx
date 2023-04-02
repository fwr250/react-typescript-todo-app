import './templates.css';


/**
 * テンプレートコンポーネント
 * @param children - レンダリングする子要素
*/
export const AppTemplate: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  return (
    <div>
      <header>
        <h1>MY TODO</h1>
      </header>
      <main>{children}</main>
    </div>
  );
};