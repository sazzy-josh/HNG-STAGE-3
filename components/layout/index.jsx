import ProtectedRoute from "../ProtectedRoute";
import TopBar from "../TopBar";

export default function Layout({children}) {
  return (
    <div className='w-[100vw] min-h-[100vh]'>
      <TopBar />
      <div className='w-full h-full'>{children}</div>
    </div>
  );
}
