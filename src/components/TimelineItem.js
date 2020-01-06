import React from 'react';
import classNames from 'classnames';

const TimelineItem = ({ children, className, tag: Tag, ...rest }) => (
	<Tag className={classNames('timeline-item', className)} {...rest}>
		{children}
	</Tag>
);

TimelineItem.defaultProps = {
	tag: 'li'
};

export default TimelineItem;
