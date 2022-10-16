pragma solidity 0.6.12;
// SPDX-License-Identifier: MIT
 
contract LoopTryError {
     uint foo=0;

     function bar() public view   returns (uint256) {
        return foo;
     }
     function executeDecreasePositions() external  view  {         
        uint256 index = 1; 
        while (index < 2) {
             try this.bar() returns (  uint256) {
             } catch {
   
            }
            index++;
         }
         
     }
}