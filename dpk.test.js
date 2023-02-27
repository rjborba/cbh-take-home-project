const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns partitionKey when given partitionKey length is <= 256", () => {
    const SMALL_PARTITION_KEY = "something";
    const key = deterministicPartitionKey({
      partitionKey: SMALL_PARTITION_KEY,
    });
    expect(key).toBe(SMALL_PARTITION_KEY);
  });

  it("Returns something different from partitionKey when given partitionKey length is > 256", () => {
    const BIG_PARTITION_KEY = "k".repeat(257);
    const key = deterministicPartitionKey({
      partitionKey: BIG_PARTITION_KEY,
    });
    expect(key).not.toBe(BIG_PARTITION_KEY);
  });

  it("Returns EXPECTED_HASH given an input 'something'", () => {
    const SMALL_PARTITION_KEY = "something";
    const EXPECTED_HASH =
      "5cc96916784936ac6c9ef034f6060f189d76582f969f79ae20612531ea161db53e10b5d2791818ac4aef0ff0677eb963a735cca798fd78e6e65a9d54b019c7b0";

    const key = deterministicPartitionKey(SMALL_PARTITION_KEY);
    expect(key).toBe(EXPECTED_HASH);
  });
});
