// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MultiSender {

  event Transfer(address _sender, address _receiver, uint _amount);

  function multiSend(uint _amount, address[] memory _addresses) public payable {
    for (uint i = 0; i < _addresses.length; i++) {
      require(msg.value >= _amount * _addresses.length, "Not enough funds");

      address addr = _addresses[i];
      (bool sent, ) = payable(addr).call{value: _amount}("");
      require(sent, "Failed to send Ether");

      emit Transfer(msg.sender, addr, _amount);
    }
  }

  function getBalance() public view returns (uint) {
    return address(this).balance;
  }

  receive() external payable {}

  fallback() external payable {}
}