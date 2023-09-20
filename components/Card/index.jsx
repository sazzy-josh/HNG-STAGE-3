import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

export default function Card({src, tag, id}) {
  const {attributes, listeners, setNodeRef, transform, transition} =
    useSortable({id: id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='flex justify-center items-center w-full h-full'
    >
      <div class='lg:w-[250px] lg:h-[300px] w-full h-full bg-white border border-gray-200 rounded-lg shadow cursor-grab'>
        <img
          class='rounded-t-lg w-full h-[250px] md:h-[200px]  object-cover'
          src={src}
          alt={`image-${tag}`}
        />

        <div class='p-5 text-slate-900 font-medium text-center text-lg'>
          <p>{tag}</p>
        </div>
      </div>
    </div>
  );
}
