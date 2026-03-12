export function Input({
  label,
  id,
  value,
  onChange,
  required,
  placeholder,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium uppercase tracking-wider">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="border border-gray-400 px-2 py-1.5 text-sm focus:border-gray-900 focus:outline-none"
      />
    </div>
  );
}
