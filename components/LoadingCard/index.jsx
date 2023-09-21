export default function LoadingCard() {
  return (
    <div className='animate-pulse max-[640px]:w-full lg:max-w-[250px] cursor-pointer hover:scale-105 hover:drop-shadow-xl '>
      <div className='relative'>
        <div className='h-[200px] bg-slate-500'></div>
      </div>
    </div>
  );
}
