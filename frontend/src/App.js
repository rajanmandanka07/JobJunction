import './App.css';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from './Home';
import Entry from './cmp/Entry';
import BeaTasker from './cmp/BeaTasker'
import Userhome from './Userhome';
import AdminLogin from './cmp/AdminLogin';
import Admin from './cmp/Admin';
import ConfirmationPage from './cmp/ConfirmationPage';
import WorktaskerMain from './cmp/worktaskermain';
import Searchresults from './cmp/searchresult';
import BookingForm from './cmp/BookingForm';
import UserProfile from './cmp/userProfile';
import TaskerProfile from './cmp/taskerProfile';
import UserCancel from './cmp/usercancel';
import TaskerCancel from './cmp/taskercancel';
import CouponBooking from './cmp/CouponBooking';
import UserReviewForm from './cmp/userReview';
import TaskerIncompReasonForm from './cmp/TaskerIncompletedreason'
import UserIncompReasonForm from './cmp/userIncompletedreason'
import DiscountCoupon from './cmp/DiscountCoupon';
import Pendingwork from './cmp/pendingwork';
import UserCompletedwork from './cmp/completedwork';
import UserInCompletedwork from './cmp/UserIncompleted';
import IncomingRequest from './cmp/incomingrequest';
import TaskerPendingWork from './cmp/taskerpendingwork';
import TaskerCompletedWork from './cmp/TaskerCompletedwork';
import TaskerInCompletedWork from './cmp/TaskerIncompleted';
function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Userhome" element={<Userhome />}></Route>
        <Route path="/Entry" element={<Entry />}></Route>
        <Route path="/BeaTasker" element={<BeaTasker />}></Route>
        <Route path="/AdminLogin" element={<AdminLogin />}></Route>
        <Route path="/Admin" element={<Admin />}></Route>
        <Route path="/Confirmation" element={<ConfirmationPage />}></Route>
        <Route path="/Taskinfo" element={<WorktaskerMain />}></Route>
        <Route path="/searchedresults" element={<Searchresults />}></Route>
        <Route path='/bookingform' element={<BookingForm />}></Route>
        <Route path='/userprofile' element={<UserProfile />}></Route>
        <Route path='/taskerprofile' element={<TaskerProfile />}></Route>
        <Route path='/usercancel' element={<UserCancel />}></Route>
        <Route path='/taskercancel' element={<TaskerCancel />}></Route>
        <Route path='/couponbooking' element={<CouponBooking />}></Route>
        <Route path='/userreviewform' element={<UserReviewForm />}></Route>
        <Route path='/taskerincompreviewform' element={<TaskerIncompReasonForm />}></Route>
        <Route path='/userincompreviewform' element={<UserIncompReasonForm />}></Route>
        <Route path='/discountcoupon' element={<DiscountCoupon />}></Route>
        <Route path='/userpending' element={<Pendingwork />}></Route>
        <Route path='/usercompleted' element={<UserCompletedwork />}></Route>
        <Route path='/userincompleted' element={<UserInCompletedwork />}></Route>
        <Route path='/incomingrequest' element={<IncomingRequest />}></Route>
        <Route path='/taskerpending' element={<TaskerPendingWork />}></Route>
        <Route path='/taskercompleted' element={<TaskerCompletedWork />}></Route>
        <Route path='/taskerincompleted' element={<TaskerInCompletedWork />}></Route>
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
