// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title ShmooPoint
 * @dev Non-transferable NFT contract for Shmoo Points
 * @notice This contract creates non-transferable tokens that have no monetary value
 */
contract ShmooPoint is ERC721, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdCounter;
    
    // Mapping to track if an address has already minted
    mapping(address => bool) public hasMinted;
    
    // Mapping to store mint timestamps
    mapping(uint256 => uint256) public mintTimestamps;
    
    // Events
    event ShmooPointMinted(address indexed to, uint256 indexed tokenId, uint256 timestamp);
    
    // Custom errors
    error AlreadyMinted();
    error TransferNotAllowed();
    error ApprovalNotAllowed();
    
    constructor() ERC721("Shmoo Point", "SHMOO") {}
    
    /**
     * @dev Mint a Shmoo Point to the caller
     * @notice Each address can only mint one Shmoo Point
     */
    function mint() external nonReentrant {
        if (hasMinted[msg.sender]) {
            revert AlreadyMinted();
        }
        
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        hasMinted[msg.sender] = true;
        mintTimestamps[tokenId] = block.timestamp;
        
        _safeMint(msg.sender, tokenId);
        
        emit ShmooPointMinted(msg.sender, tokenId, block.timestamp);
    }
    
    /**
     * @dev Get the total number of minted tokens
     */
    function totalSupply() external view returns (uint256) {
        return _tokenIdCounter.current();
    }
    
    /**
     * @dev Get mint timestamp for a token
     */
    function getMintTimestamp(uint256 tokenId) external view returns (uint256) {
        require(_exists(tokenId), "Token does not exist");
        return mintTimestamps[tokenId];
    }
    
    /**
     * @dev Check if an address has minted a Shmoo Point
     */
    function hasAddressMinted(address account) external view returns (bool) {
        return hasMinted[account];
    }
    
    /**
     * @dev Override transfer functions to make tokens non-transferable
     */
    function transferFrom(address, address, uint256) public pure override {
        revert TransferNotAllowed();
    }
    
    function safeTransferFrom(address, address, uint256) public pure override {
        revert TransferNotAllowed();
    }
    
    function safeTransferFrom(address, address, uint256, bytes memory) public pure override {
        revert TransferNotAllowed();
    }
    
    /**
     * @dev Override approval functions to prevent approvals
     */
    function approve(address, uint256) public pure override {
        revert ApprovalNotAllowed();
    }
    
    function setApprovalForAll(address, bool) public pure override {
        revert ApprovalNotAllowed();
    }
    
    /**
     * @dev Override token URI to return metadata
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        
        // Return base64 encoded JSON metadata
        string memory json = string(abi.encodePacked(
            '{"name": "Shmoo Point #', 
            Strings.toString(tokenId),
            '", "description": "A unique, non-transferable Shmoo point with no monetary value. For fun, for identity, for nothing else.", "image": "data:image/svg+xml;base64,',
            _generateSVG(tokenId),
            '", "attributes": [{"trait_type": "Mint Timestamp", "value": ',
            Strings.toString(mintTimestamps[tokenId]),
            '}, {"trait_type": "Transferable", "value": "No"}, {"trait_type": "Monetary Value", "value": "None"}]}'
        ));
        
        return string(abi.encodePacked(
            "data:application/json;base64,",
            _base64Encode(bytes(json))
        ));
    }
    
    /**
     * @dev Generate SVG image for the token
     */
    function _generateSVG(uint256 tokenId) internal pure returns (string memory) {
        string memory svg = string(abi.encodePacked(
            '<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">',
            '<defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">',
            '<stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />',
            '<stop offset="100%" style="stop-color:#16213e;stop-opacity:1" />',
            '</linearGradient></defs>',
            '<rect width="400" height="400" fill="url(#bg)"/>',
            '<circle cx="200" cy="200" r="80" fill="#4ade80" opacity="0.8"/>',
            '<text x="200" y="280" font-family="Arial, sans-serif" font-size="24" fill="#e5e7eb" text-anchor="middle">Shmoo #',
            Strings.toString(tokenId),
            '</text>',
            '<text x="200" y="320" font-family="Arial, sans-serif" font-size="12" fill="#9ca3af" text-anchor="middle">Non-Transferable</text>',
            '</svg>'
        ));
        
        return _base64Encode(bytes(svg));
    }
    
    /**
     * @dev Base64 encoding function
     */
    function _base64Encode(bytes memory data) internal pure returns (string memory) {
        if (data.length == 0) return "";
        
        string memory table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        string memory result = new string(4 * ((data.length + 2) / 3));
        
        assembly {
            let tablePtr := add(table, 1)
            let resultPtr := add(result, 32)
            
            for {
                let dataPtr := data
                let endPtr := add(dataPtr, mload(data))
            } lt(dataPtr, endPtr) {
                
            } {
                dataPtr := add(dataPtr, 3)
                let input := mload(dataPtr)
                
                mstore8(resultPtr, mload(add(tablePtr, and(shr(18, input), 0x3F))))
                resultPtr := add(resultPtr, 1)
                mstore8(resultPtr, mload(add(tablePtr, and(shr(12, input), 0x3F))))
                resultPtr := add(resultPtr, 1)
                mstore8(resultPtr, mload(add(tablePtr, and(shr(6, input), 0x3F))))
                resultPtr := add(resultPtr, 1)
                mstore8(resultPtr, mload(add(tablePtr, and(input, 0x3F))))
                resultPtr := add(resultPtr, 1)
            }
            
            switch mod(mload(data), 3)
            case 1 {
                mstore8(sub(resultPtr, 1), 0x3d)
                mstore8(sub(resultPtr, 2), 0x3d)
            }
            case 2 {
                mstore8(sub(resultPtr, 1), 0x3d)
            }
        }
        
        return result;
    }
}
