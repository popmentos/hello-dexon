pragma solidity ^0.4.25;

contract Hello {
    uint256 public value;

    event updateNumber(uint256);

    function update() public {
        value = rand;
        emit updateNumber(value);
    }

    function get() public view returns (uint256) {
        return value;
    }
}
