﻿using System;
using System.IO;
using System.Windows;
using System.Windows.Media;
using Microsoft.Kinect;
using System.Threading;
using Newtonsoft.Json;

namespace Microsoft.Samples.Kinect.SkeletonBasics
{
    class SkeletonGrabber
    {

        /// <summary>
        /// Active Kinect sensor
        /// </summary>
        private KinectSensor sensor;

        /// <summary>
        /// Connection to the tcp client
        /// </summary>
        MyTCP_Client tcp;
        bool hasConnection;
        string server = "mycroft.ad.sofse.org";

        public SkeletonGrabber()
        {
            MyTCP_Client tcp = new MyTCP_Client();
            this.tcp = tcp;
            this.hasConnection = true;
            InitializeComponent();
        }

        private void InitializeComponent()
        {
            // Look through all sensors and start the first connected one.
            // This requires that a Kinect is connected at the time of app startup.
            // To make your app robust against plug/unplug, 
            // it is recommended to use KinectSensorChooser provided in Microsoft.Kinect.Toolkit (See components in Toolkit Browser).
            foreach (var potentialSensor in KinectSensor.KinectSensors)
            {
                if (potentialSensor.Status == KinectStatus.Connected)
                {
                    this.sensor = potentialSensor;
                    break;
                }
            }

            if (null != this.sensor)
            {
                // Turn on the skeleton stream to receive skeleton frames
                this.sensor.ColorStream.Enable(ColorImageFormat.RgbResolution640x480Fps30);
                this.sensor.DepthStream.Enable(DepthImageFormat.Resolution640x480Fps30);
                this.sensor.SkeletonStream.Enable();
                this.sensor.ColorStream.Enable(ColorImageFormat.InfraredResolution640x480Fps30);

                // Add an event handler to be called whenever there is new color frame data
                this.sensor.SkeletonFrameReady += this.SensorSkeletonFrameReady;

                // Start the sensor!
                try
                {
                    this.sensor.Start();
                }
                catch (IOException)
                {
                    this.sensor = null;
                }
            }

            if (null == this.sensor)
            {
                Console.WriteLine(Properties.Resources.NoKinectReady);
            }
        }
        /// <summary>
        /// Event handler for Kinect sensor's SkeletonFrameReady event
        /// </summary>
        /// <param name="sender">object sending the event</param>
        /// <param name="e">event arguments</param>
        private void SensorSkeletonFrameReady(object sender, SkeletonFrameReadyEventArgs e)
        {
            Skeleton[] skeletons = new Skeleton[0];

            using (SkeletonFrame skeletonFrame = e.OpenSkeletonFrame())
            {
                if (skeletonFrame != null)
                {
                    skeletons = new Skeleton[skeletonFrame.SkeletonArrayLength];
                    skeletonFrame.CopySkeletonDataTo(skeletons);
                }
            }
            if (skeletons.Length != 0)
            {
                Skeleton skel = skeletons[0];
                //Thread.Sleep(100);
                if (skel.TrackingState == SkeletonTrackingState.Tracked)
                {
                    sendBodyParts(skel);
                }
                
            }

        }

        private void sendBodyParts(Skeleton skeleton)
        {
            bool status = true;

            BodyPart left = this.grabLeftHand(skeleton,out status);
            BodyPart right = this.grabRightHand(skeleton,out status);
            BodyPart torso = this.grabTorso(skeleton,out status);
             
            if (status) {
                Body body = new Body(right,left,torso);
                Message message = new Message("Kinect1", "Master", body);
                string send = JsonConvert.SerializeObject(message);
                Console.WriteLine("Sending Message: " + send);
                try
                {
                    this.tcp.Connect(this.server, send);
                }
                catch (LostConnection e)
                {
                    if (!LostConnectionToServer(e.Message,send))
                    {
                        this.hasConnection = false;
                    }
                }
            }
            else
            {
                Console.WriteLine("Lost Track of one of the Joints");
            }
        }

        private bool LostConnectionToServer(String timeoutLength,String send)
        {
            int start = DateTime.Now.Millisecond;
            int diff = Convert.ToInt32(timeoutLength);
            bool reconnected = false;
            while (DateTime.Now.Millisecond < start + diff)
            {
                Thread.Sleep(diff / 5);
                this.tcp = new MyTCP_Client();
                try
                {
                    this.tcp.Connect(this.server, send);
                    reconnected = true;
                    break;
                }
                catch (LostConnection e) { }
            }
            return reconnected;
        }

        private BodyPart grabRightHand(Skeleton skeleton, out bool status)
        {
            SkeletonPoint rHand = skeleton.Joints[JointType.WristRight].Position;
            BodyPart hand = new BodyPart( rHand.X, rHand.Y, rHand.Z, true);
            status = true;
            if (skeleton.Joints[JointType.WristRight].TrackingState != JointTrackingState.Tracked)
            {
                status = false;
                Console.WriteLine(skeleton.Joints[JointType.WristRight].TrackingState);
                Console.WriteLine("Lost right Hand");
            }
            
            return hand;
        }

        private BodyPart grabLeftHand(Skeleton skeleton,out bool status)
        {
            SkeletonPoint lHand = skeleton.Joints[JointType.WristLeft].Position;
            BodyPart hand = new BodyPart(lHand.X, lHand.Y, lHand.Z, true);
            status = true;
            if (skeleton.Joints[JointType.WristRight].TrackingState != JointTrackingState.Tracked)
            {
                status = false;
                Console.WriteLine(skeleton.Joints[JointType.WristLeft].TrackingState);
                Console.WriteLine("Lost left Hand");
            }
            return hand;
        }

        private BodyPart grabTorso(Skeleton skeleton,out bool status)
        {
            SkeletonPoint torso = skeleton.Joints[JointType.Spine].Position;
            BodyPart spine = new BodyPart( torso.X, torso.Y, torso.Z, true);
            status = true;
            if (skeleton.Joints[JointType.WristRight].TrackingState != JointTrackingState.Tracked)
            {
                status = false;
                Console.WriteLine(skeleton.Joints[JointType.Spine].TrackingState);
                Console.WriteLine("Lost torso");
            }
            return spine;
        }

        static void Main(string[] args)
        {
            SkeletonGrabber sg = new SkeletonGrabber();
            while (sg.hasConnection) ;
        }
    }


}
