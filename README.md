# restaurant-odin

#notes
updateviewbox function is great coz it updates the entire screent based on any change no matter where the change was done

use class names to access dom so that even if you move around the design later you dont have to change much code in the domhandler

start with really basic design to get the scripts to actually work

date() constructor returns an object yes but it has implicit object to string toString() that converts it

when passing arrays to domHandler like this with references inside, make sure you duplicate the array to not change the original array

to toglge bool: bool = !bool

duplicating array: .slice(0)

decisions should be made from the most intrinsic values and not extrinsic ones, like displaying checked todos must be done from checking the state of the todo itself, not moving these todos in an array when they are checked