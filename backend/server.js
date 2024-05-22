const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/user");
const cors = require("cors");
const Tasker = require("./models/tasker");
const Tasks = require("./models/tasks");
const Bookings = require("./models/bookings");
const UserPending = require("./models/userPending");
const TaskerPending = require("./models/taskerPending");
const app = express();
const PORT = process.env.PORT || 4000;
const Incomingrequest = require("./models/incomingrequest");
const UserCancel = require("./models/usercancel");
const TaskerConfirm = require('./models/taskerconfirm')
const UserConfirm = require('./models/userconfirm')
const TaskerCancel = require('./models/taskercancel')
const Notification = require('./models/notifications');
const UserReview = require('./models/userreviews')
const UserIncompleted = require('./models/userincompleted')
const TaskerIncompleted = require('./models/taskerincompleted')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://jaybhatt51:jaybhatt51@cluster0.y2m8s6t.mongodb.net/jobjunction?retryWrites=true&w=majority&appName=Cluster0",
    {  }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phone, area } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
      phone,
      area,
    });

    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (password != user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res
      .status(200)
      .json({
        name: user.name,
        email: user.email,
        phone: user.phone,
        userId: user._id,
        password: user.password,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//tasker signup

app.post("/taskersignup", async (req, res) => {
  try {
    const { name, email, password, phone, area, task } = req.body;

    // Check if user already exists
    let tasker = await Tasker.findOne({ email });
    if (tasker) {
      return res.status(400).json({ message: "Tasker already exists" });
    }

    tasker = new Tasker({
      name,
      email,
      password,
      phone,
      area,
      task,
    });

    await tasker.save();
    res.status(201).json({ message: "Tasker created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//Tasker Login
app.post("/taskerlogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const tasker = await Tasker.findOne({ email });
    if (!tasker) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (password != tasker.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ name: tasker.name,
      email: tasker.email,
      phone: tasker.phone,
      taskerId: tasker._id,
      password: tasker.password, });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//admin
app.post("/adminlogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email != "jaybhatt260@gmail.com" || password != "admin123") {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//add task
app.post("/addtask", async (req, res) => {
  try {
    const { category, task, price } = req.body;

    let tasks = await Tasks.findOne({ task });
    if (tasks) {
      return res.status(400).json({ message: "Task already exists" });
    }
    tasks = new Tasks({
      category,
      task,
      price,
    });
    await tasks.save();
    res.status(201).json({ message: "Tasks created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// get  tasks on home page tabs
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Tasks.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// check availability and confirm booking
app.post("/checkavailability", async (req, res) => {
  try {
    const {
      address,
      area,
      task,
      slot,
      date,
      price,
      userId,
      username,
      userphone,
    } = req.body;
    console.log(
      address,
      area,
      task,
      slot,
      date,
      price,
      userId,
      username,
      userphone
    );
    // Query to find taskers matching area and task
    const taskers = await Tasker.find({ area, task });
    if (!taskers || taskers.length === 0) {
      // No taskers found in the area for the given task
      return res
        .status(405)
        .json({ message: "No taskers available in your area" });
    }

    // Array to store available taskers
    const availableTaskers = [];

    // Query to check availability for each tasker
    for (const tasker of taskers) {
      let bookings = await Bookings.find({ taskerId: tasker._id, slot, date });

      if (bookings.length === 0) {
        try {
          const body = {
            taskerId: tasker._id,
            userphone,
            username,
            useraddress: address,
            taskname: task,
            taskprice: price,
            taskslot: slot,
            taskdate: date,
          };
          const innerResponse = await fetch(
            "http://localhost:4000/inner-request",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            }
          );
          let data = await innerResponse.json();
            console.log(data.confirm)
          if (data.confirm === "true") {
            availableTaskers.push({
              taskername: tasker.name,
              taskerphone: tasker.phone,
              taskname: task,
              taskprice: price,
              taskslot: slot,
              taskdate: date,
            });
            bookings = new Bookings({
              taskerId: tasker._id,
              slot,
              date,
              userId,
              usercoupon:"NO"
            });
            await bookings.save();
            let userPending = new UserPending({
              taskername: tasker.name,
              taskerphone: tasker.phone,
              taskname: task,
              taskprice: price,
              taskslot: slot,
              taskdate: date,
              userId,
              taskerId: tasker._id,
            });
            await userPending.save();
            let taskerPending = new TaskerPending({
              taskerId: tasker._id,
              userphone,
              username,
              useraddress: address,
              taskname: task,
              taskprice: price,
              taskslot: slot,
              taskdate: date,
              userId
            });
            await taskerPending.save();
            break;
          } else {
            continue;
          }
        } catch (error) {
          console.error("Error occurred:", error.message);
          return res.status(500).send("An error occurred");
        }
      } else {
        continue;
      }
    }
    console.log(availableTaskers)
    if (availableTaskers.length === 0) {
      // No available taskers at the selected date and slot
      return res
        .status(404)
        .json({ message: "No taskers available at selected date and slot" });
    }

    // Return available taskers
    return res.status(200).json(availableTaskers);
  } catch (error) {
    console.error("Error checking availability", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/get-incoming", async (req, res) => {
  let { taskerId } = req.body;
  try {
    const allTempEntries = await Incomingrequest.find({ taskerId });
    if (allTempEntries.length === 0) {
      return res
        .status(405)
        .json({ message: "No Incoming Request at this time." });
    }
    res.send(allTempEntries);
  } catch (error) {
    console.error("Error occurred:", error.message);
    res.status(500).send("An error occurred");
  }
});

app.post("/give-confirm", async (req, res) => {
  let { requestId, confirm } = req.body;
  try {
    const updatedTempEntries = await Incomingrequest.updateMany(
      { _id: requestId },
      { $set: { confirm: confirm } }
    );
    res.send(updatedTempEntries);
  } catch (error) {
    console.error("Error occurred:", error.message);
    res.status(500).send("An error occurred");
  }
});

app.post("/inner-request", async (req, res) => {
  let {
    taskerId,
    userphone,
    username,
    useraddress,
    taskname,
    taskprice,
    taskslot,
    taskdate,
  } = req.body;
  try {
    const incomingrequest = new Incomingrequest({
      taskerId,
      userphone,
      username,
      useraddress,
      taskname,
      taskprice,
      taskslot,
      taskdate,
      confirm: "false",
    });

    await incomingrequest.save();
    let allTempEntries;
    setTimeout(async () => {
      try {
        allTempEntries = await Incomingrequest.find({
          taskerId,
          taskslot,
          taskdate,
        });
        const savedEntries = [];
        for (let entry of allTempEntries) {
          savedEntries.push(await entry.save());
        }
    
        // Delete the entries
        const deleteEntry = await Incomingrequest.deleteMany({
          taskerId,
          taskslot,
          taskdate,
        });
        console.log(deleteEntry)
        // Now you can respond with the confirmation data from the saved entries
        
        res.status(200).json({confirm : savedEntries[0].confirm});
      } catch (error) {
        console.error("Error occurred:", error.message);
        res.status(300).json({ message: "Server error" });
      }
    }, 20000);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//update User
app.post("/updateuser", async (req, res) => {
  try {
    const { email, name, password, phone, area } = req.body;

    // Find the user by email
    let user = await User.findOne({ email });

    // If user doesn't exist, return an error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user's data
    user.name = name;
    user.password = password;
    user.phone = phone;
    user.area = area;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//update tasker 
app.post("/updatetasker", async (req, res) => {
  try {
    const { email, name, password, phone, area,task } = req.body;

    // Find the user by email
    let tasker = await Tasker.findOne({ email });

    // If user doesn't exist, return an error
    if (!tasker) {
      return res.status(404).json({ message: "Tasker not found" });
    }

    // Update tasker's data
    tasker.name = name;
    tasker.password = password;
    tasker.phone = phone;
    tasker.area = area;
    tasker.task = task;

    // Save the updated tasker
    await tasker.save();

    res.status(200).json({ message: "Tasker updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//get user Pending task in user profile
app.post("/userpending", async (req, res) => {
  try {
    const { userId } = req.body;

    // Find all userPending tasks for the given userId
    const userPendingTasks = await UserPending.find({ userId });

    res.status(200).json({ userPendingTasks });
  } catch (error) {
    console.error("Error retrieving userPending tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/taskerpending", async (req, res) => {
  try {
    const { taskerId } = req.body;

    // Find all userPending tasks for the given userId
    const taskerPendingTasks = await TaskerPending.find({ taskerId });

    res.status(200).json({ taskerPendingTasks });
  } catch (error) {
    console.error("Error retrieving userPending tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//tasker completed
app.post("/taskercompleted", async (req, res) => {
  try {
    const { taskerId } = req.body;

    // Find all userPending tasks for the given userId
    const taskerCompletedTasks = await TaskerConfirm.find({ taskerId });

    res.status(200).json({ taskerCompletedTasks });
  } catch (error) {
    console.error("Error retrieving userPending tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// user completed
app.post("/usercompleted", async (req, res) => {
  try {
    const { userId } = req.body;

    // Find all userPending tasks for the given userId
    const userCompletedTasks = await UserConfirm.find({ userId });

    res.status(200).json({ userCompletedTasks });
  } catch (error) {
    console.error("Error retrieving user Completed tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// user cancel 
app.post("/usercancel", async (req, res) => {
  try {
    const { userId,taskname,taskdate,taskslot,taskerId,reason,taskprice } = req.body;
    const user1 = await User.findOne({ _id:userId });
    const tasker1 = await Tasker.findOne({ _id:taskerId });
    console.log(userId);
    // Find all userPending tasks for the given userId
    let userCancel = new UserCancel({
      taskername:tasker1.name,
      taskerphone:tasker1.phone,
      taskname,
      taskprice,
      taskslot,
      taskdate,
      userId,
      taskerId,
      username:user1.name,
      userphone:user1.phone,
      reason
    });
    await userCancel.save();

    const deleteBooking = await Bookings.deleteMany({
      userId,
      slot:taskslot,
      date:taskdate,
      taskerId
    });
    const deleteUserPending = await UserPending.deleteMany({
      userId,
      taskslot,
      taskdate,
      taskerId
    });
    const deleteTaskerPending = await TaskerPending.deleteMany({
      userId,
      taskslot,
      taskdate,
      taskerId
    });
    console.log(deleteBooking + " delete user " + deleteUserPending + " delete tasker" + deleteTaskerPending)
    res.status(200).json({ message: "Sucessfully cancelled" });
  } catch (error) {
    console.error("Error retrieving userPending tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// tasker confirm
app.post("/taskerconfirm", async (req, res) => {
  try {
    const { taskerId,
      userphone,
      username,
      useraddress,
      taskname,
      taskprice,
      taskslot,
      taskdate,
      userId } = req.body;
    
    
    let taskerconfirm = new TaskerConfirm({
      useraddress,
      taskname,
      taskprice,
      taskslot,
      taskdate,
      userId,
      taskerId,
      username,
      userphone,
    });
    await taskerconfirm.save();

    let tasker1 = await Tasker.findOne({_id:taskerId});
    let userconfirm = new UserConfirm({
              taskername: tasker1.name,
              taskerphone: tasker1.phone,
              taskname,
              taskprice,
              taskslot,
              taskdate,
              userId,
              taskerId,
              review:"NO",
    });
    await userconfirm.save();

    const deleteBooking = await Bookings.deleteMany({
      userId,
      slot:taskslot,
      date:taskdate,
      taskerId
    });
    const deleteUserPending = await UserPending.deleteMany({
      userId,
      taskslot,
      taskdate,
      taskerId
    });
    const deleteTaskerPending = await TaskerPending.deleteMany({
      userId,
      taskslot,
      taskdate,
      taskerId
    });
    console.log(deleteBooking + " delete user " + deleteUserPending + " delete tasker" + deleteTaskerPending)
    res.status(200).json({ message: "Sucessfully Completed" });
  } catch (error) {
    console.error("Error retrieving completed task tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//tasker cancel
app.post("/taskercancel", async (req, res) => {
  try {
    const { userId,taskname,taskdate,taskslot,taskerId,reason,taskprice,username,userphone,useraddress } = req.body;
    const tasker1 = await Tasker.findOne({ _id:taskerId });
    let taskerCancel = new TaskerCancel({
    taskdate,
    taskslot,
    taskername:tasker1.name,
    taskerphone:tasker1.phone,
    taskprice,
    taskname,
    username,
    userphone,
    userId,
    taskerId,
    reason,
    useraddress
    });
    await taskerCancel.save();


     await Bookings.deleteMany({
      userId,
      slot:taskslot,
      date:taskdate,
      taskerId
    });
     await UserPending.deleteMany({
      userId,
      taskslot,
      taskdate,
      taskerId
    });
     await TaskerPending.deleteMany({
      userId,
      taskslot,
      taskdate,
      taskerId
    });
    // check the date if it was today then there is no choice rather than giving the discount
    
      let notification = new Notification({
        taskdate,
        taskslot,
        taskername:tasker1.name,
        taskerphone:tasker1.phone,
        taskprice:taskprice*0.8,
        taskname,
        username,
        userphone,
        userId,
        taskerId,
        reason,
        useraddress
        });
        await notification.save();
        res.status(200).json(notification);
    
  } catch (error) {
    console.error("Error retrieving userPending tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// get notifications from userside 
app.post("/getnotifications", async (req, res) => {
  try {
    const { userId } = req.body;

    // Find all userPending tasks for the given userId
    const userCoupons = await Notification.find({ userId });

    res.status(200).json({ userCoupons });
  } catch (error) {
    console.error("Error retrieving user Completed tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// coupon user now book using coupon
app.post("/couponavailability", async (req, res) => {
  try {
    const {
      address,
      area,
      task,
      slot,
      date,
      price,
      userId,
      username,
      userphone,
      taskerId,
      usercoupon
    } = req.body;
    console.log(
      address,
      area,
      task,
      slot,
      date,
      price,
      userId,
      username,
      userphone,
      taskerId,
      usercoupon
    );
    // Query to find taskers matching area and task
    const taskers = await Tasker.find({ area, task });
    if (!taskers || taskers.length === 0) {
      // No taskers found in the area for the given task
      return res
        .status(405)
        .json({ message: "No taskers available in your area" });
    }

    // Array to store available taskers
    const availableTaskers = [];

    // Query to check availability for each tasker
    for (const tasker of taskers) {
      if(tasker._id === taskerId)continue;
      let bookings = await Bookings.find({ taskerId: tasker._id, slot, date });

      if (bookings.length === 0) {
        try {
          const body = {
            taskerId: tasker._id,
            userphone,
            username,
            useraddress: address,
            taskname: task,
            taskprice: price,
            taskslot: slot,
            taskdate: date,
          };
          const innerResponse = await fetch(
            "http://localhost:4000/inner-request",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            }
          );
          let data = await innerResponse.json();
            console.log(data.confirm)
          if (data.confirm === "true") {
            availableTaskers.push({
              taskername: tasker.name,
              taskerphone: tasker.phone,
              taskname: task,
              taskprice: price,
              taskslot: slot,
              taskdate: date,
            });
            bookings = new Bookings({
              taskerId: tasker._id,
              slot,
              date,
              userId,
              usercoupon
            });
            await bookings.save();
            await Notification.deleteMany({
              userId,
              taskname:task,
              taskerId
            });
            let userPending = new UserPending({
              taskername: tasker.name,
              taskerphone: tasker.phone,
              taskname: task,
              taskprice: price,
              taskslot: slot,
              taskdate: date,
              userId,
              taskerId: tasker._id,
            });
            await userPending.save();
            let taskerPending = new TaskerPending({
              taskerId: tasker._id,
              userphone,
              username,
              useraddress: address,
              taskname: task,
              taskprice: price,
              taskslot: slot,
              taskdate: date,
              userId
            });
            await taskerPending.save();
            break;
          } else {
            continue;
          }
        } catch (error) {
          console.error("Error occurred:", error.message);
          return res.status(500).send("An error occurred");
        }
      } else {
        continue;
      }
    }
    console.log(availableTaskers)
    if (availableTaskers.length === 0) {
      // No available taskers at the selected date and slot
      return res
        .status(404)
        .json({ message: "No taskers available at selected date and slot" });
    }

    // Return available taskers
    return res.status(200).json(availableTaskers);
  } catch (error) {
    console.error("Error checking availability", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


// user review 
app.post("/userreview", async (req, res) => {
  try {
    const { taskdate,
  taskslot,
  taskername,
  taskerphone,
  taskprice,
  taskname,
  userId,
  taskerId,
  review,
  ratings,
  confirmId} = req.body;

    // Find all userPending tasks for the given userId
    let userReview = new UserReview({
      taskdate,
  taskslot,
  taskername,
  taskerphone,
  taskprice,
  taskname,
  userId,
  taskerId,
  review,
  ratings
    });
    await userReview.save();
    let givereview = await UserConfirm.findOne({ _id:confirmId });
    givereview.review = "YES"
    await givereview.save();
    res.status(200).json({ message:"Thank you for reviews and ratings" });
  } catch (error) {
    console.error("Error retrieving user Completed tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// automatically delete if time gets completed and tasker did not performed or other reason
app.post('/deleteYesterdayEntries', async (req, res) => {
  try {
    const currentDate = new Date(); // Current date
    const yesterdayDate = new Date(currentDate.getTime() - (24 * 60 * 60 * 1000)); // Yesterday's date

    // Set time to beginning of the day
    yesterdayDate.setUTCHours(0, 0, 0, 0);

    // Log yesterday date for debugging
    console.log('Yesterday Date:', yesterdayDate.toISOString().split('T')[0]);

    // Delete entries from MongoDB collection where the date matches yesterday's date
    let userincompleted = await UserPending.find({ taskdate: yesterdayDate.toISOString() });
    let taskerincompleted = await TaskerPending.find({ taskdate: yesterdayDate.toISOString() });
    console.log('User Incompleted:', userincompleted);
    console.log('Tasker Incompleted:', taskerincompleted);

    // Map over userincompleted and add your own field
    if (userincompleted.length > 0) {
      const modifiedUserIncompleted = userincompleted.map(doc => ({
    taskdate: doc.taskdate,
    taskslot: doc.taskslot,
    taskername: doc.taskername,
    taskerphone: doc.taskerphone,
    taskprice: doc.taskprice,
    taskname: doc.taskname,
    userId: doc.userId,
    taskerId: doc.taskerId,
        review:'NO',
        reason:' '
      }));
      await UserIncompleted.insertMany(modifiedUserIncompleted);
      await UserPending.deleteMany({ taskdate: yesterdayDate.toISOString() });
    }

    // Map over taskerincompleted and add your own field
    if (taskerincompleted.length > 0) {
      const modifiedTaskerIncompleted = taskerincompleted.map(doc => ({
        taskdate: doc.taskdate,
    taskslot: doc.taskslot,
    taskprice: doc.taskprice,
    taskname: doc.taskname,
    userId: doc.userId,
    taskerId: doc.taskerId,
    useraddress:doc.useraddress,
    username: doc.username,
    userphone:doc.userphone,
        review: 'NO',
        reason:' '
      }));
      // Insert modified documents into new collections
      await TaskerIncompleted.insertMany(modifiedTaskerIncompleted);
      await TaskerPending.deleteMany({ taskdate: yesterdayDate.toISOString() });
    }

    // Delete bookings for yesterday's date
    await Bookings.deleteMany({ date: yesterdayDate.toISOString() });

    res.sendStatus(200);
  } catch (error) {
    console.error('Error deleting yesterday entries:', error);
    res.sendStatus(500);
  }
});



// get user incompleted task 
app.post("/userincompleted", async (req, res) => {
  try {
    const { userId } = req.body;

    // Find all userPending tasks for the given userId
    const userInCompletedTasks = await UserIncompleted.find({ userId });

    res.status(200).json({ userInCompletedTasks });
  } catch (error) {
    console.error("Error retrieving user Completed tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//get tasker incompleted task
app.post("/taskerincompleted", async (req, res) => {
  try {
    const { taskerId } = req.body;

    // Find all userPending tasks for the given userId
    const taskerInCompletedTasks = await TaskerIncompleted.find({ taskerId });

    res.status(200).json({ taskerInCompletedTasks });
  } catch (error) {
    console.error("Error retrieving user Completed tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// give user incompleted reason
app.post("/userIncompletedreason", async (req, res) => {
  try {
    const { reason,
  incompId
} = req.body;
    console.log(incompId)
    // Find all userPending tasks for the given userId
    let userIncompletedReview = await UserIncompleted.findOne({ _id:incompId });
    userIncompletedReview.reason = reason;
    userIncompletedReview.review = 'YES';
    await userIncompletedReview.save();
    res.status(200).json({ message:"Thank you for providing reason" });
  } catch (error) {
    console.error("Error retrieving user Completed tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// give tasker incompleted reason
app.post("/taskerIncompletedreason", async (req, res) => {
  try {
    const { reason,
  incompId} = req.body;

    // Find all userPending tasks for the given userId
    let taskerIncompletedReview = await TaskerIncompleted.findOne({ _id:incompId });
    taskerIncompletedReview.reason = reason;
    taskerIncompletedReview.review = 'YES';
    await taskerIncompletedReview.save();
    res.status(200).json({ message:"Thank you for providing reason" });
  } catch (error) {
    console.error("Error retrieving user Completed tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// search 
app.get('/search', async (req, res) => {
  const query = req.query.q; // Get the search query from the query string

  try {
    // Search for tasks where any field matches the query partially
    const results = await Tasks.find({
      $or: [
        { category: { $regex: query, $options: 'i' } }, // Case-insensitive search
        { task: { $regex: query, $options: 'i' } },
        // Add more fields if needed
      ]
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error searching tasks' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
