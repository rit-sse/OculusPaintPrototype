using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Microsoft.Samples.Kinect.SkeletonBasics
{
    class Body
    {
        public BodyPart RHand;
        public BodyPart LHand;
        public BodyPart Torso;

        public Body(BodyPart RHand, BodyPart LHand, BodyPart Torso)
        {
            this.RHand = RHand;
            this.LHand = LHand;
            this.Torso = Torso;
        }
    }
}
