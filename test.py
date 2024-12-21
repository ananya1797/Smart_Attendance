# import cv2
# import numpy as np
# from sklearn.neighbors import KNeighborsClassifier
# from pymongo import MongoClient
# import time
# from datetime import datetime
# from win32com.client import Dispatch
# import os
# import csv

# # Function to speak
# def speak(message):
#     speak = Dispatch(("SAPI.SpVoice"))
#     speak.Speak(message)

# # MongoDB setup
# client = MongoClient("mongodb://localhost:27017/")
# db = client["attendance_system"]
# students_collection = db["students"]
# attendance_collection = db["attendance"]

# # Load face data from MongoDB
# students = list(students_collection.find())
# faces = []
# labels = []
# usns = []

# for student in students:
#     name = student["name"]
#     usn = student["usn"]
#     face_data = np.array(student["faces_data"])  # Get the face data from MongoDB
#     faces.append(face_data)
#     labels.extend([name] * len(face_data))  # Label each face with the student's name
#     usns.extend([usn] * len(face_data))  # Store the corresponding USNs

# faces = np.concatenate(faces)  # Convert list of arrays to one large array
# print("Shape of Faces matrix:", faces.shape)

# # Train KNN classifier with the face data
# knn = KNeighborsClassifier(n_neighbors=5)
# knn.fit(faces, labels)

# # Initialize webcam
# video = cv2.VideoCapture(0)
# facedetect = cv2.CascadeClassifier('data/haarcascade_frontalface_default.xml')
# imgBackground = cv2.imread("background.png")

# COL_NAMES = ['NAME', 'USN', 'DATE', 'TIME']

# # Main loop to capture and process frames
# while True:
#     ret, frame = video.read()
#     gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#     faces_in_frame = facedetect.detectMultiScale(gray, 1.3, 5)

#     for (x, y, w, h) in faces_in_frame:
#         crop_img = frame[y:y + h, x:x + w, :]
#         resized_img = cv2.resize(crop_img, (50, 50)).flatten().reshape(1, -1)

#         # Predict the label (student name) for the detected face
#         name = knn.predict(resized_img)[0]
#         person_index = labels.index(name)
#         usn = usns[person_index]  # Get the USN for the detected person

#         # Get timestamp for attendance
#         ts = time.time()
#         date = datetime.fromtimestamp(ts).strftime("%d-%m-%Y")
#         timestamp = datetime.fromtimestamp(ts).strftime("%H:%M:%S")

#         # Save attendance to MongoDB
#         existing_attendance = attendance_collection.find_one({"name": name, "date": date})
#         if not existing_attendance:
#             attendance_collection.insert_one({
#                 "name": name,
#                 "usn": usn,
#                 "date": date,
#                 "time": timestamp
#             })
#             print(f"Attendance taken for {name} on {date} at {timestamp}")
#             # speak(f"Attendance taken for {name}")
#             speak('Webcam open')
#         # Display bounding boxes and name on the frame
#         exist = os.path.isfile("Attendance/Attendance_" + date + ".csv")
#         cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 255), 1)
#         cv2.rectangle(frame, (x, y), (x + w, y + h), (50, 50, 255), 2)
#         cv2.rectangle(frame, (x, y - 40), (x + w, y), (50, 50, 255), -1)
#         cv2.putText(frame, name, (x, y - 15), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 1)
#         attendance = [name, usn, date, timestamp] 
#     # Show the frame
#     imgBackground[162:162 + 480, 55:55 + 640] = frame
#     cv2.imshow("Frame", imgBackground)
#     k = cv2.waitKey(1)
    
#     # If 'o' is pressed, take attendance
#     if k == ord('o'):
#         speak("Attendance Taken..")
#         time.sleep(1)
#         if exist:
#             with open("Attendance/Attendance_" + date + ".csv", "+a") as csvfile:
#                 writer = csv.writer(csvfile)
#                 writer.writerow(attendance)
#         else:
#             with open("Attendance/Attendance_" + date + ".csv", "+a") as csvfile:
#                 writer = csv.writer(csvfile)
#                 writer.writerow(COL_NAMES)
#                 writer.writerow(attendance)


#     # Exit if 'q' is pressed
#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

# # Release resources
# video.release()
# cv2.destroyAllWindows()
# import cv2
# import numpy as np
# from sklearn.neighbors import KNeighborsClassifier
# from pymongo import MongoClient
# import time
# from datetime import datetime
# from win32com.client import Dispatch
# import os
# import csv

# # Function to speak
# def speak(message):
#     speak = Dispatch(("SAPI.SpVoice"))
#     speak.Speak(message)

# # MongoDB setup
# client = MongoClient("mongodb://localhost:27017/")
# db = client["attendance_system"]
# students_collection = db["students"]
# attendance_collection = db["attendance"]

# # Load face data from MongoDB
# students = list(students_collection.find())
# faces = []
# labels = []
# usns = []

# for student in students:
#     name = student["name"]
#     usn = student["usn"]
#     face_data = np.array(student["faces_data"])  # Get the face data from MongoDB
#     faces.append(face_data)
#     labels.extend([name] * len(face_data))  # Label each face with the student's name
#     usns.extend([usn] * len(face_data))  # Store the corresponding USNs

# faces = np.concatenate(faces)  # Convert list of arrays to one large array
# print("Shape of Faces matrix:", faces.shape)

# # Train KNN classifier with the face data
# knn = KNeighborsClassifier(n_neighbors=5)
# knn.fit(faces, labels)

# # Initialize webcam
# video = cv2.VideoCapture(0)
# facedetect = cv2.CascadeClassifier('data/haarcascade_frontalface_default.xml')
# imgBackground = cv2.imread("background.png")

# COL_NAMES = ['NAME', 'USN', 'DATE', 'TIME']

# # Main loop to capture and process frames
# while True:
#     ret, frame = video.read()
#     gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#     faces_in_frame = facedetect.detectMultiScale(gray, 1.3, 5)

#     for (x, y, w, h) in faces_in_frame:
#         crop_img = frame[y:y + h, x:x + w, :]
#         resized_img = cv2.resize(crop_img, (50, 50)).flatten().reshape(1, -1)

#         # Predict the label (student name) for the detected face
#         name = knn.predict(resized_img)[0]
#         person_index = labels.index(name)
#         usn = usns[person_index]  # Get the USN for the detected person

#         # Get timestamp for attendance
#         ts = time.time()
#         date = datetime.fromtimestamp(ts).strftime("%d-%m-%Y")
#         timestamp = datetime.fromtimestamp(ts).strftime("%H:%M:%S")

#         # Save attendance to MongoDB
#         existing_attendance = attendance_collection.find_one({"name": name, "date": date})
#         if not existing_attendance:
#             attendance_collection.insert_one({
#                 "name": name,
#                 "usn": usn,
#                 "date": date,
#                 "time": timestamp
#             })
#             print(f"Attendance taken for {name} on {date} at {timestamp}")
#             # speak(f"Attendance taken for {name}")
#             speak('Webcam open')
#         # Display bounding boxes and name on the frame
#         exist = os.path.isfile("Attendance/Attendance_" + date + ".csv")
#         cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 255), 1)
#         cv2.rectangle(frame, (x, y), (x + w, y + h), (50, 50, 255), 2)
#         cv2.rectangle(frame, (x, y - 40), (x + w, y), (50, 50, 255), -1)
#         cv2.putText(frame, name, (x, y - 15), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 1)
#         attendance = [name, usn, date, timestamp] 
#     # Show the frame
#     imgBackground[162:162 + 480, 55:55 + 640] = frame
#     cv2.imshow("Frame", imgBackground)
#     k = cv2.waitKey(1)
    
#     # If 'o' is pressed, take attendance
#     if k == ord('o'):
#         speak("Attendance Taken..")
#         time.sleep(1)
#         if exist:
#             with open("Attendance/Attendance_" + date + ".csv", "+a") as csvfile:
#                 writer = csv.writer(csvfile)
#                 writer.writerow(attendance)
#         else:
#             with open("Attendance/Attendance_" + date + ".csv", "+a") as csvfile:
#                 writer = csv.writer(csvfile)
#                 writer.writerow(COL_NAMES)
#                 writer.writerow(attendance)


#     # Exit if 'q' is pressed
#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

# # Release resources
# video.release()
# cv2.destroyAllWindows()

# import cv2
# import numpy as np
# from sklearn.neighbors import KNeighborsClassifier
# from pymongo import MongoClient
# import time
# from datetime import datetime
# from win32com.client import Dispatch
# import os
# import csv

# # Function to speak
# def speak(message):
#     speak = Dispatch(("SAPI.SpVoice"))
#     speak.Speak(message)

# # MongoDB setup
# client = MongoClient("mongodb://localhost:27017/")
# db = client["attendance_system"]
# students_collection = db["students"]
# attendance_collection = db["attendance"]

# # Load face data from MongoDB
# students = list(students_collection.find())
# faces = []
# labels = []
# usns = []

# for student in students:
#     name = student["name"]
#     usn = student["usn"]
#     face_data = np.array(student["faces_data"])  # Get the face data from MongoDB
    
#     # Ensure each face is flattened consistently (if it's not already)
#     if face_data.ndim > 1:  # If the face data is not flat, flatten it
#         face_data = face_data.flatten()
    
#     faces.append(face_data)
#     labels.extend([name] * len(face_data))  # Label each face with the student's name
#     usns.extend([usn] * len(face_data))  # Store the corresponding USNs

# faces = np.array(faces)  # Convert list of arrays to one large array
# print("Shape of Faces matrix:", faces.shape)

# # Train KNN classifier with the face data
# knn = KNeighborsClassifier(n_neighbors=5)
# knn.fit(faces, labels)

# # Initialize webcam
# video = cv2.VideoCapture(0)
# facedetect = cv2.CascadeClassifier('data/haarcascade_frontalface_default.xml')
# imgBackground = cv2.imread("background.png")

# COL_NAMES = ['NAME', 'USN', 'DATE', 'TIME']

# # Main loop to capture and process frames
# while True:
#     ret, frame = video.read()
#     gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#     faces_in_frame = facedetect.detectMultiScale(gray, 1.3, 5)

#     for (x, y, w, h) in faces_in_frame:
#         crop_img = frame[y:y + h, x:x + w, :]
#         resized_img = cv2.resize(crop_img, (50, 50)).flatten().reshape(1, -1)

#         # Predict the label (student name) for the detected face
#         name = knn.predict(resized_img)[0]
#         person_index = labels.index(name)
#         usn = usns[person_index]  # Get the USN for the detected person

#         # Get timestamp for attendance
#         ts = time.time()
#         date = datetime.fromtimestamp(ts).strftime("%d-%m-%Y")
#         timestamp = datetime.fromtimestamp(ts).strftime("%H:%M:%S")

#         # Save attendance to MongoDB
#         existing_attendance = attendance_collection.find_one({"name": name, "date": date})
#         if not existing_attendance:
#             attendance_collection.insert_one({
#                 "name": name,
#                 "usn": usn,
#                 "date": date,
#                 "time": timestamp
#             })
#             print(f"Attendance taken for {name} on {date} at {timestamp}")
#             # speak(f"Attendance taken for {name}")
#             speak('Webcam open')
        
#         # Display bounding boxes and name on the frame
#         exist = os.path.isfile("Attendance/Attendance_" + date + ".csv")
#         cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 255), 1)
#         cv2.rectangle(frame, (x, y), (x + w, y + h), (50, 50, 255), 2)
#         cv2.rectangle(frame, (x, y - 40), (x + w, y), (50, 50, 255), -1)
#         cv2.putText(frame, name, (x, y - 15), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 1)
#         attendance = [name, usn, date, timestamp]

#     # Show the frame
#     imgBackground[162:162 + 480, 55:55 + 640] = frame
#     cv2.imshow("Frame", imgBackground)
#     k = cv2.waitKey(1)
    
#     # If 'o' is pressed, take attendance
#     if k == ord('o'):
#         speak("Attendance Taken..")
#         time.sleep(1)
#         if exist:
#             with open("Attendance/Attendance_" + date + ".csv", "+a") as csvfile:
#                 writer = csv.writer(csvfile)
#                 writer.writerow(attendance)
#         else:
#             with open("Attendance/Attendance_" + date + ".csv", "+a") as csvfile:
#                 writer = csv.writer(csvfile)
#                 writer.writerow(COL_NAMES)
#                 writer.writerow(attendance)

#     # Exit if 'q' is pressed
#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

# # Release resources
# video.release()
# cv2.destroyAllWindows()
# import cv2
# import numpy as np
# from sklearn.neighbors import KNeighborsClassifier
# from pymongo import MongoClient
# import time
# from datetime import datetime
# from win32com.client import Dispatch
# import os
# import csv

# # Function to speak
# def speak(message):
#     speak = Dispatch(("SAPI.SpVoice"))
#     speak.Speak(message)

# # MongoDB setup
# client = MongoClient("mongodb://localhost:27017/")
# db = client["attendance_system"]
# students_collection = db["students"]
# attendance_collection = db["attendance"]

# # Load face data from MongoDB
# students = list(students_collection.find())
# faces = []
# labels = []
# usns = []

# # Loop through each student to load face data
# for student in students:
#     name = student["name"]
#     usn = student["usn"]
#     # Ensure face_data is consistently shaped before appending
#     for face in student["faces_data"]:
#         # Resize and flatten face images to a consistent shape
#         resized_face = cv2.resize(face, (50, 50)).flatten()
#         faces.append(resized_face)
#         labels.append(name)
#         usns.append(usn)

# # Convert faces into a numpy array
# faces = np.array(faces)
# print("Shape of Faces matrix:", faces.shape)

# # Train KNN classifier with the face data
# knn = KNeighborsClassifier(n_neighbors=5)
# knn.fit(faces, labels)

# # Initialize webcam
# video = cv2.VideoCapture(0)
# facedetect = cv2.CascadeClassifier('data/haarcascade_frontalface_default.xml')
# imgBackground = cv2.imread("background.png")

# COL_NAMES = ['NAME', 'USN', 'DATE', 'TIME']

# # Main loop to capture and process frames
# while True:
#     ret, frame = video.read()
#     gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#     faces_in_frame = facedetect.detectMultiScale(gray, 1.3, 5)

#     for (x, y, w, h) in faces_in_frame:
#         crop_img = frame[y:y + h, x:x + w, :]
#         resized_img = cv2.resize(crop_img, (50, 50)).flatten().reshape(1, -1)

#         # Predict the label (student name) for the detected face
#         name = knn.predict(resized_img)[0]
#         person_index = labels.index(name)
#         usn = usns[person_index]  # Get the USN for the detected person

#         # Get timestamp for attendance
#         ts = time.time()
#         date = datetime.fromtimestamp(ts).strftime("%d-%m-%Y")
#         timestamp = datetime.fromtimestamp(ts).strftime("%H:%M:%S")

#         # Save attendance to MongoDB
#         existing_attendance = attendance_collection.find_one({"name": name, "date": date})
#         if not existing_attendance:
#             attendance_collection.insert_one({
#                 "name": name,
#                 "usn": usn,
#                 "date": date,
#                 "time": timestamp
#             })
#             print(f"Attendance taken for {name} on {date} at {timestamp}")
#             # speak(f"Attendance taken for {name}")
#             speak('Webcam open')

#         # Display bounding boxes and name on the frame
#         exist = os.path.isfile("Attendance/Attendance_" + date + ".csv")
#         cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 255), 1)
#         cv2.rectangle(frame, (x, y), (x + w, y + h), (50, 50, 255), 2)
#         cv2.rectangle(frame, (x, y - 40), (x + w, y), (50, 50, 255), -1)
#         cv2.putText(frame, name, (x, y - 15), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 1)
#         attendance = [name, usn, date, timestamp]

#     # Show the frame
#     imgBackground[162:162 + 480, 55:55 + 640] = frame
#     cv2.imshow("Frame", imgBackground)
#     k = cv2.waitKey(1)
    
#     # If 'o' is pressed, take attendance
#     if k == ord('o'):
#         speak("Attendance Taken..")
#         time.sleep(1)
#         if exist:
#             with open("Attendance/Attendance_" + date + ".csv", "+a") as csvfile:
#                 writer = csv.writer(csvfile)
#                 writer.writerow(attendance)
#         else:
#             with open("Attendance/Attendance_" + date + ".csv", "+a") as csvfile:
#                 writer = csv.writer(csvfile)
#                 writer.writerow(COL_NAMES)
#                 writer.writerow(attendance)

#     # Exit if 'q' is pressed
#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

# # Release resources
# video.release()
# cv2.destroyAllWindows()

from sklearn.neighbors import KNeighborsClassifier
import cv2
import pickle
import numpy as np
import os
import csv
import time
from datetime import datetime
from win32com.client import Dispatch

def speak(str1):
    speak = Dispatch("SAPI.SpVoice")
    speak.Speak(str1)

video = cv2.VideoCapture(0)
facedetect = cv2.CascadeClassifier('data/haarcascade_frontalface_default.xml')

# Load names, USNs, and faces data from pickle files
with open('data/names.pkl', 'rb') as w:
    LABELS = pickle.load(w)
with open('data/usns.pkl', 'rb') as f:
    USNS = pickle.load(f)
with open('data/faces_data.pkl', 'rb') as f:
    FACES = pickle.load(f)

print('Shape of Faces matrix --> ', FACES.shape)

knn = KNeighborsClassifier(n_neighbors=5)
knn.fit(FACES, LABELS)

imgBackground = cv2.imread("background.png")

COL_NAMES = ['NAME', 'USN', 'DATE', 'TIME']  # Include USN in the column names

while True:
    ret, frame = video.read()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = facedetect.detectMultiScale(gray, 1.3, 5)
    for (x, y, w, h) in faces:
        crop_img = frame[y:y+h, x:x+w, :]
        resized_img = cv2.resize(crop_img, (50, 50)).flatten().reshape(1, -1)
        output = knn.predict(resized_img)
        
        # Get the predicted name and corresponding USN
        name = output[0]
        name_index = LABELS.index(name)
        usn = USNS[name_index]  # Get corresponding USN
        
        ts = time.time()
        date = datetime.fromtimestamp(ts).strftime("%d-%m-%Y")
        timestamp = datetime.fromtimestamp(ts).strftime("%H:%M:%S")
        
        exist = os.path.isfile("Attendance/Attendance_" + date + ".csv")
        
        # Draw the face bounding box and labels on the frame
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 255), 1)
        cv2.rectangle(frame, (x, y), (x + w, y + h), (50, 50, 255), 2)
        cv2.rectangle(frame, (x, y - 40), (x + w, y), (50, 50, 255), -1)
        cv2.putText(frame, f"Name: {name}", (x, y - 15), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 1)
        cv2.putText(frame, f"USN: {usn}", (x, y + h + 30), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 1)

        # Store attendance data
        attendance = [name, usn, date, timestamp]
        
    # Place the frame on top of the background image
    imgBackground[162:162 + 480, 55:55 + 640] = frame
    
    # Display the frame
    cv2.imshow("Frame", imgBackground)

    k = cv2.waitKey(1)
    
    if k == ord('o'):  # When 'o' is pressed, mark attendance
        speak("Attendance Marked..")
        time.sleep(1)
        
        if exist:  # If the CSV for today exists, append attendance
            with open("Attendance/Attendance_" + date + ".csv", "a", newline='') as csvfile:
                writer = csv.writer(csvfile)
                writer.writerow(attendance)
        else:  # If the CSV doesn't exist, create it and write headers
            with open("Attendance/Attendance_" + date + ".csv", "w", newline='') as csvfile:
                writer = csv.writer(csvfile)
                writer.writerow(COL_NAMES)
                writer.writerow(attendance)

    elif k == ord('q'):  # When 'q' is pressed, break the loop
        break

video.release()
cv2.destroyAllWindows()

