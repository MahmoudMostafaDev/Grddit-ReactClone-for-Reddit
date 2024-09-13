export default function Button({
  children,
  onClick,
  type,
  success,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      type={type || "submit"}
      className={
        `text-white text-md font-semibold ${
          success ? "bg-green-600" : "bg-blue-800"
        } py-2 px-4 rounded-full hover:bg-blue-600 ` + className
      }
    >
      {children}
    </button>
  );
}
