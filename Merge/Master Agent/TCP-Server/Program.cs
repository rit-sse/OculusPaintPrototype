using System;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text;

class MyTcpListener
{
    public static void Main()
    {
        TcpListener kinectListener = null;
        TcpListener oculusListener = null;
        try
        {
            // Set the TcpListener on port 13000.
            Int32 kinectPort = 8124;
            Int32 oculusPort = 8125;
            IPAddress localAddr = IPAddress.Parse("127.0.0.1");

            // TcpListener server = new TcpListener(port);
            kinectListener = new TcpListener(localAddr, kinectPort);
            oculusListener = new TcpListener(localAddr,oculusPort);
            // Start listening for client requests.
            kinectListener.Start();
            oculusListener.Start();
            // Buffer for reading data
            Byte[] bytes = new Byte[256];
            String data = null;

            // Enter the listening loop. 
            Console.Write("Waiting for a connection... ");
            TcpClient oculus, kinect = null;

            // Perform a blocking call to accept requests. 
            // You could also user server.AcceptSocket() here.

            kinect = kinectListener.AcceptTcpClient();
            Console.WriteLine("Kinect Connected!");
            oculus = oculusListener.AcceptTcpClient();
            Console.WriteLine("Oculus Connected!");
            while (true)
            {
               

                data = null;

                // Get a stream object for reading and writing
                NetworkStream kinectStream = kinect.GetStream();
                NetworkStream oculusStream = oculus.GetStream();
                

                int i;

                // Loop to receive all the data sent by the client. 
                while ((i = kinectStream.Read(bytes, 0, bytes.Length)) != 0)
                {
                    // Translate data bytes to a ASCII string.
                    data = System.Text.Encoding.ASCII.GetString(bytes, 0, i);
                    Console.WriteLine("Received: {0}", data);

                     byte[] msg = System.Text.Encoding.ASCII.GetBytes(data);

                     oculusStream.Write(msg, 0, msg.Length);

                   
                }

            }
        }
        catch (SocketException e)
        {
            Console.WriteLine("SocketException: {0}", e);
        }
        finally
        {
            // Stop listening for new clients.
            kinectListener.Stop();
            oculusListener.Stop();
        }


        Console.WriteLine("\nHit enter to continue...");
        Console.Read();
    }
}