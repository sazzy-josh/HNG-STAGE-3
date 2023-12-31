import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

export default function Card({src, tag, id, currentId}) {
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
      <div
        class={`w-[180px] h-[150px] md:w-[250px] lg:h-[300px] bg-white border border-gray-200 rounded-lg shadow cursor-grab ${
          currentId === id
            ? "border-grey-700 shadow-[5px_5px_0px_0px_rgba(109,40,217)] shadow-slate-950"
            : ""
        }`}
      >
        <img
          class='rounded-t-lg w-full h-[100px] md:h-[200px] object-cover'
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
