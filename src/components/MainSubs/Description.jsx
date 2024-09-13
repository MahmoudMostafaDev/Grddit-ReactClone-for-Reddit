export default function Description({
  description,
  subId,
  mainTitle,
  memberCount,
}) {
  return (
    <div className="mt-5 bg-search-background p-5 rounded-2xl">
      <h2 className="text-2xl font-bold text-white">{mainTitle}</h2>
      <p className="text-slate-400 ">g/{subId}</p>
      <p className="text-slate-400 ">{memberCount} members </p>
      <p className="text-slate-200 text-lg mt-3">{description}</p>
    </div>
  );
}
