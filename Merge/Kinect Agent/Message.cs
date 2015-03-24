using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Microsoft.Samples.Kinect.SkeletonBasics
{
    class Message
    {
        public String from;
        public String to;
        public Body data;

        public Message(String from, String to, Body data)
        {
            this.from = from;
            this.to = to;
            this.data = data;
        }
    }
}
