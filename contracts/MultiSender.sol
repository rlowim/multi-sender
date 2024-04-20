// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title Multi-Address Sender
/// @author rlowim
/// @notice Allows users to easily send Ethers to multiple Ethereum addresses
contract MultiSender {

  event TransferToAddress(address _sender, address _receiver, uint _amount);
  event TransferChange(address _receiver, uint _change);

  /// @notice Sends the same amount of ethers to the provided addresses
  /// @param _amount Amount of ETH to send to a single address
  /// @param _addresses List of recipient addresses
  function multiSend(uint _amount, address[] memory _addresses) public payable {
    for (uint i = 0; i < _addresses.length; i++) {
      require(msg.value >= _amount * _addresses.length, "Not enough funds");

      (bool isSentToAddresses, ) = payable(_addresses[i]).call{value: _amount}("");
      require(isSentToAddresses, "Failed to send Ether");

      emit TransferToAddress(msg.sender, _addresses[i], _amount);
    }
    uint change = msg.value - (_amount * _addresses.length);
    (bool isSentChange, ) = payable(msg.sender).call{value: change}("");
    require(isSentChange, "Failed to send change back");
    
    emit TransferChange(msg.sender, change);
  }



}