using System;
using System.IO;
using System.Windows;
using System.Windows.Media;
using Microsoft.Kinect;

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

        public SkeletonGrabber()
        {
            MyTCP_Client tcp = new MyTCP_Client();
            this.tcp = tcp;
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
                foreach (Skeleton skel in skeletons)
                {

                    if (skel.TrackingState == SkeletonTrackingState.Tracked)
                    {
                        sendBodyParts(skel);
                    }
                }
            }

        }

        private void sendBodyParts(Skeleton skeleton)
        {
            String vectors = @"{";
            vectors += this.grabRightWrist(skeleton);
            vectors += @",";
            vectors += this.grabChest(skeleton);
            vectors += @"}";
            this.tcp.Connect("127.0.0.1", vectors);
        }

        private String grabRightWrist(Skeleton skeleton)
        {
            SkeletonPoint rWrist = skeleton.Joints[JointType.WristRight].Position;
            String vector = @"rWrist"": [ {""X"":" + rWrist.X + @",""Y"":" + rWrist.Y + @",""Z"":" + rWrist.Z + "}]";
            return vector;
        }

        private String grabChest(Skeleton skeleton)
        {
            SkeletonPoint chest = skeleton.Joints[JointType.Spine].Position;
            String vector = @"Chest"": [ {""X"":" + chest.X + @",""Y"":" + chest.Y + @",""Z"":" + chest.Z + "}]";
            return vector;
        }

        static void Main(string[] args)
        {
            SkeletonGrabber sg = new SkeletonGrabber();
            while (true) ;
        }
    }


}
