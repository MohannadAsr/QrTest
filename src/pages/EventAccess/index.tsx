import EventVipDetails from '@components/EventAccess/EventVipDetails';
import { useVipAuth } from '@src/Auth/Vips/useVipAuth';
import background from '/background.jpg';
function EventAccess() {
  const { isLoggedIn } = useVipAuth();
  return (
    <div
      className=" min-h-[100vh] bg-white py-3 relative  md:bg-cover bg-contain bg-repeat "
      style={{ backgroundImage: `url(${background})` }}
    >
      <span className=" absolute left-0 top-0 h-full w-full bg-primary opacity-60 z-[1] "></span>
      <div className=" flex items-center justify-center bg-primary p-4 w-fit mx-auto brand-rounded z-[2]">
        <img src="/logo.webp" alt="" className=" h-[80px] md:h-[150px] z-[2]" />
      </div>
      <EventVipDetails />
    </div>
  );
}

export default EventAccess;
