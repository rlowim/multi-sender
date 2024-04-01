// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title Multi-Address Sender
/// @author rlowim
/// @notice Allows users to easily send Ethers to multiple Ethereum addresses
contract MultiSender {

  event Transfer(address _sender, address _receiver, uint _amount);

  /// @notice Sends the same amount of ethers to the provided addresses
  /// @param _amount Amount of ETH to send to a single address
  /// @param _addresses List of recipient addresses
  function multiSend(uint _amount, address[] memory _addresses) public payable {
    for (uint i = 0; i < _addresses.length; i++) {
      require(msg.value >= _amount * _addresses.length, "Not enough funds");

      (bool sent, ) = payable(_addresses[i]).call{value: _amount}("");
      require(sent, "Failed to send Ether");

      emit Transfer(msg.sender, _addresses[i], _amount);
    }
    uint change = msg.value - (_amount * _addresses.length);
    payable(msg.sender).transfer(change);
  }

  /// @notice Returns the balance of the smart contract
  /// @return Contract balance in wei
  function getBalance() public view returns (uint) {
    return address(this).balance;
  }

  receive() external payable {}

  fallback() external payable {}
}