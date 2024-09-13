export default function Input({
  placeholder,
  name,
  type,
  register = () => {},
  registerOptions,
}) {
  return (
    <>
      <label className="text-slate-300 text-lg px-1 mt-5 block  font-semibold">
        {placeholder}
      </label>
      <input
        type={type}
        name={name}
        className="w-full mt-2 p-3 border border-slate-700 rounded-lg bg-slate-800 text-white text-lg focus:outline-none focus:border-slate-600"
        {...register(name, registerOptions)}
      />
    </>
  );
}
