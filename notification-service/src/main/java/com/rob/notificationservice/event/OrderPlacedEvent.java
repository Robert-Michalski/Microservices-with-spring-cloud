package com.rob.notificationservice.event;

import lombok.Builder;

@Builder
public record OrderPlacedEvent(long orderId) {
}
