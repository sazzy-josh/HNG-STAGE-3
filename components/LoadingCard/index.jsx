export default function LoadingCard() {
  return (
    <div className='animate-pulse max-[640px]:w-full lg:max-w-[250px] cursor-pointer hover:scale-105 hover:drop-shadow-xl'>
      <div className='relative'>
        <div className='h-[200px] bg-slate-200'></div>
        <div className='absolute top-0 p-4 flex justify-between w-full'>
          <p className='bg-slate-200 w-4 px-2 py-1 rounded-2xl font-bold text-xs flex items-center'></p>
        </div>
      </div>
    </div>
  );
}
