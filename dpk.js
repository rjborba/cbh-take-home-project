const crypto = require("crypto");

const digest = (data) =>
  crypto.createHash("sha3-512").update(data).digest("hex");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  const candidate = event.partitionKey ?? digest(JSON.stringify(event));

  return candidate.length <= MAX_PARTITION_KEY_LENGTH
    ? candidate
    : digest(candidate);
};
