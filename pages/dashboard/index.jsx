import Card from "@/components/Card";
import Layout from "@/components/layout";
import {imagesDb} from "@/db/data";
import {useEffect, useState} from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSwappingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import LoadingMovieCard from "@/components/LoadingCard";
import {useAuth} from "@/context/auth";
import {useRouter} from "next/router";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const {user, setUser} = useAuth();
  const [currentId, setCurrentId] = useState(null);
  const [shadow, setShadow] = useState(false);
  const router = useRouter();

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  //Keeps track of authentication
  useEffect(() => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    setUser(token);

    !token ? router.push("/") : router.push("/dashboard");
  }, []);

  useEffect(() => {
    setIsloading(true);
    let filteredItems = imagesDb?.filter((img) => {
      const tag = img.tag;
      return tag.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setItems(filteredItems);
    const clearTimer = setTimeout(() => setIsloading(false), 3000);

    return () => clearTimeout(clearTimer);
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const getId = (event) => {
    const {
      active: {id},
    } = event;
    setCurrentId(id);
  };

  const handleDragEnd = (event) => {
    const {active, over} = event;
    setCurrentId(null);

    if (active?.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item?.id === active?.id);
      const newIndex = items.findIndex((item) => item?.id === over?.id);
      setItems((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <>
      <Layout>
        <div className='p-4 bg-slate-200'>
          <div className='flex justify-center w-full h-20 p-4 relative top-[80px]'>
            <input
              class='border w-full md:w-4/12 border-gray-400 focus:outline-slate-400 rounded-md x shadow-sm px-5 py-2 '
              type='text'
              name='search'
              value={searchQuery}
              onChange={handleSearch}
              placeholder='search image'
            />
          </div>

          {isloading ? (
            <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 items-center gap-y-4 md:gap-y-2 justify-center min-h-screen min-w-[] w-90 py-20 px-10 border rounded-lg mx-auto'>
              {[...Array(10)].map((_, idx) => (
                <LoadingMovieCard key={idx} />
              ))}
            </div>
          ) : (
            <>
              {items.length != 0 ? (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragStart={getId}
                  onDragEnd={handleDragEnd}
                >
                  <div className='grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 gap-y-4 md:gap-y-2 min-h-screen w-90 py-20 px-10 border border-slate-300 shadow-md rounded-lg mx-auto'>
                    <SortableContext
                      items={items}
                      strategy={rectSwappingStrategy}
                    >
                      {items.map((item) => {
                        return (
                          <Card
                            {...item}
                            currentId={currentId}
                            key={item.id}
                            id={item.id}
                          />
                        );
                      })}
                    </SortableContext>
                  </div>
                </DndContext>
              ) : (
                <div className='flex items-center justify-center w-screen h-screen'>
                  Ooops! No item found
                </div>
              )}
            </>
          )}
        </div>
      </Layout>
    </>
  );
}
