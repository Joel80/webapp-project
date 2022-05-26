
const utils = {
    calculateReach: function calculateReach (delayTime: number): number {
        delayTime -= 5;
        if (delayTime !== 0) {
            return (delayTime*100/2);
        }

        return delayTime;
       
    }
    
}

export default utils;
