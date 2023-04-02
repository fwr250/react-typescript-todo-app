import './Textbox.css';

type TextboxProps = {
  textboxType: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
};

/**
 * テキストボックスコンポーネント
 */
export const Textbox: React.FC<TextboxProps> = ({ textboxType, value, onChange, placeholder, type = 'text' }) => {
  return (
    <input
      className={`Textbox ${textboxType}`}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};